import { Injectable } from '@angular/core';
import { Input } from '@angular/core';
import { url } from './enviorment';
import { HttpClient } from '@angular/common/http';
import { tema } from './tema';
import { TemaComponent } from './tema/tema.component';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(private http: HttpClient) { }

  onInit(): void {
    console.log("Tema service onInit");
    this.getTemas();
  }

  TEMAS: string[] = [];
  @Input() temaContenedor: string = '';
  private url = `${url}/api/tema`;

  getTemas(): string[] {
    this.http.get(this.url).subscribe((data : any) => {
      let array = data as tema[];
      array.forEach(element => {
        this.TEMAS.push(element.nombre);
      });
    })
    return this.TEMAS;
  }

  addTema(tema: string) {
    if (this.TEMAS.includes(tema)) {
      const modalElement = document.getElementById('modalTemaExiste');
      if (modalElement) {
        /*
        modalElement.classList.add('show');
        modalElement.style.display = 'block';
        */
      }
    }else{
      this.TEMAS.push(tema);
      this.resetContenedor();
      let temi: tema = {nombre: tema};
      this.http.post(this.url, {tema : temi}).subscribe((data: { [key: string]: any }) => {console.log(data)});
      
    }
    
  }

  delTema(tema: string) {
    this.TEMAS.splice(this.TEMAS.indexOf(tema), 1);
    this.resetContenedor();
    //delete a webapi
  }

  resetContenedor(): void{
    this.temaContenedor = '';
  }
}

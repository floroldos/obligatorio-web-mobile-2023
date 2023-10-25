import { Injectable } from '@angular/core';
import { Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor() { }

  TEMAS: string[] = [];
  @Input() temaContenedor: string = '';

  getTemas(): string[] {
    // get a webapi
    return this.TEMAS;
  }

  addTema(tema: string) {
    console.log(tema);
    this.TEMAS.push(tema);
    this.resetContenedor();
    //push a webapi
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

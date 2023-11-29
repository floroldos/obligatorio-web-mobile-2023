import { Component, Input } from '@angular/core';
import { TarjetaService } from '../tarjeta.service';
import { tarjeta } from '../tarjeta';
import { TemaService } from '../tema.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SalaService } from '../sala.service';
import { FormsModule } from '@angular/forms';
import { url } from '../enviorment';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})

export class LobbyComponent {
  constructor(private router: Router, private http: HttpClient) { }
  
  temaS = new TemaService(this.http);
  tarjS = new TarjetaService(this.http);
  salaService = new SalaService(this.router, this.http);
  tarjetas: tarjeta[] = [
    {
      id_tarjeta: 1,
      nombre: 'Meme de memes',
      descripcion: 'meme de memes con cheems',
      imagen: '../assets/memememes.jpg',
      puntos: 0,
      tema: 'Memes'
    },
    {
      id_tarjeta: 2,
      nombre: 'Among us',
      descripcion: 'among us pero es mr beast',
      imagen: '../assets/img.png',
      puntos: 0,
      tema: 'Memes'
    }
  ];
  private urlGet = `${url}/api/actividad`;


  ngOnInit(): void {  
    console.log("Lobby init");
    this.temaS.getTemas();
    this.http.get(this.urlGet).subscribe((data: { [key: string]: any }) => {
      this.tarjetas = data as tarjeta[];
   });
  }

  @Input() temaContenedor: string = '';
  
  @Input() tarjContenedor: tarjeta = {
    id_tarjeta: -1, 
    nombre: '',
    descripcion: '',
    imagen: '',
    puntos: 0,
    tema: ''
  };
  
 crearSala(){
    this.salaService.crearSala();
 }

  agregarTarjeta(tarj: tarjeta){
    this.tarjetas.push(tarj);
    this.tarjS.agregarTarjeta(tarj);
    
  }

  quitarTarjeta(tarj: tarjeta){
    tarj.puntos = 0;
    this.tarjS.quitarTarjeta(tarj);
  }

 crearTema(tema : string){
    console.log(tema);
    this.temaS.addTema(tema);
 }

 /* es para que carguen las imagenes de las tarjetas */
 
 cargarImagen(event: any) {
  const file = event.target.files[0];
  
  if (file) {
    // Genera una URL para la imagen cargada
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.tarjContenedor.imagen = e.target.result;
    };

    reader.readAsDataURL(file);
  }
}
}

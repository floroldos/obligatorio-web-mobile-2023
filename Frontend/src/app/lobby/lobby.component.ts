import { Component, Input } from '@angular/core';
import { TarjetaService } from '../tarjeta.service';
import { tarjeta } from '../tarjeta';
import { TemaService } from '../tema.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SalaService } from '../sala.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})

export class LobbyComponent {
  constructor(private router: Router, private http: HttpClient) { }
  
  temaS = new TemaService();
  tarjS = new TarjetaService(this.http);
  salaService = new SalaService(this.router, this.http);
  tarjetasGeneradas: tarjeta[] = [];

  @Input() temaContenedor: string = '';
  
  @Input() tarjContenedor: tarjeta = {
    id: -1,
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
    this.agregarTarjeta(tarj);
  }

  quitarTarjeta(tarj: tarjeta){
    tarj.puntos = 0;
    this.quitarTarjeta(tarj);
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

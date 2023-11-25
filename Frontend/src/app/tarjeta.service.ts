import { Injectable } from '@angular/core';
import { tarjeta } from './tarjeta';
import { Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from './enviorment';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  constructor(private http: HttpClient) {}

  // ALMACENAR TARJETAS EN WEBAPI: NECESITAMOS QUE EL ARRAY DE TODAS LAS TARJETAS SE GUARDE AHÍ
  // EN EL ANGULAR: TRAER DE LA API TODAS LAS TARJETAS Y GUARDARLAS EN EL ARRAY DE TARJETAS PARA MOSTRARLAS (ver el get)
  // NO GUARDAR TARJETAS EN EL ANGULAR pq no hay persistencia :3

  //el componente tarjet llama a la lista del service y el service la trae de la webapi godeto

  // ELTEMA VOTOS: TIENE QUE IR A LA WEBAPI, NO AL ANGULAR, Y RELACIONARSE CON CADA USUARIO (post)
  // LOGICA VOTOS: A LA API (porque no suma los votos de un usuario con los del otro)
  // se traen tarjetas cuando incie, se vota, se suman votos en api
  // la webapi tiene q devolver las tarjetas con más votos (podio) o la mas votada :v

  // y  todo esto mismo con los temas

  private urlPost = `${url}/api/crearActividad`;

  id: number = 0;  

  TARJETAS: tarjeta[] = [
    {
      id: 1,
      nombre: 'miamsi',
      descripcion: 'aaa',
      imagen: 'assets/img.png',
      puntos: 0,
      tema: 'el pepe'
    },
    {
      id: 1,
      nombre: 'pepe',
      descripcion: 'asdasdasd',
      imagen: 'assets/img.png',
      puntos: 0,
      tema: 'el pepe'
    }
  ];

  //Para agregar tarjetas a la lista de tarjetas existentes
  agregarTarjeta(tarj: tarjeta){
    console.log(tarj.nombre);
    tarj.id = this.id;
    this.id ++;
    this.TARJETAS.push(tarj);
    this.http.post(
      this.urlPost, {
        tarjetaNueva: tarj,
      }).subscribe((data: { [key: string]: any }) => {
        console.log(data);
      });
  }

  quitarTarjeta(tarj: tarjeta){
    this.TARJETAS.splice(this.TARJETAS.indexOf(tarj), 1);
  }
}

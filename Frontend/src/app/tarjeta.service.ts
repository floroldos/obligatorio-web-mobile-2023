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

  private urlGet = `${url}/api/actividad`;

  TARJETAS: tarjeta[] = [
    {
      id_tarjeta: 1,
      nombre: 'miamsi',
      descripcion: 'aaa',
      imagen: 'assets/img.png',
      puntos: 0,
      tema: 'el pepe'
    },
    {
      id_tarjeta: 1,
      nombre: 'pepe',
      descripcion: 'asdasdasd',
      imagen: 'assets/img.png',
      puntos: 0,
      tema: 'el pepe'
    }
  ];

  tarjetasPorTema: tarjeta[] = [];
  tarjetasSeleccionadas: tarjeta[] = [];

  id: number = 0;
  puntos: number = 0;
  votoEnviado: boolean = false; //para mostrar el mensaje de voto enviado
  tarjetaActual: number = 0; //lleva control de la tarjeta actual para el timeout
  cambio: any; //variable para el timeout, para que cambie la tarjeta cada 30 segundos
  mostrarPuntaje: boolean = false; //para mostrar el puntaje si ya pasaron todas las tarjetas
  puntajes: { [tarjetaId: number]: number } = {}; //para guardar los puntajes de cada tarjeta
  tarjetaMasVotada: tarjeta | null = null;
  estadoVotacion: boolean = true;

  @Input() contenedor: tarjeta = { 
    id_tarjeta: -1,
    nombre: '',
    descripcion: '', // no se
    imagen: '',
    puntos: 0,
    tema: ''}
    ;

  //Para agregar tarjetas a la lista de tarjetas existentes
  agregarTarjeta(tarj: tarjeta){
    let tema = document.getElementById('option') as HTMLInputElement;
    console.log(tema);
    tarj.tema = (tema.value).toString();
    console.log(tarj.tema);
    tarj.id_tarjeta = this.id; // es auto inncremental, ni idea algo asi, lo borramos?
    this.id ++; 
    this.TARJETAS.push(tarj); // pero
    this.http.post( 
      this.urlPost, {
        tarjetaNueva: tarj,
      }).subscribe((data: { [key: string]: any }) => {
        console.log(data);
      });
  }

  getTarjetas(){
    this.http.get(this.urlGet).subscribe((data : any) => {
      console.log(data);
      this.TARJETAS = data;
    });

  }

  quitarTarjeta(tarj: tarjeta){
    this.TARJETAS.splice(this.TARJETAS.indexOf(tarj), 1);
  }
}

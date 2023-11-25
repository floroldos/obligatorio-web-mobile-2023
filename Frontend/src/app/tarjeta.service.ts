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
    id: -1,
    nombre: '',
    descripcion: '',
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
    tarj.id = this.id;
    this.id ++; 
    this.TARJETAS.push(tarj); // 
    this.http.post( 
      this.urlPost, {
        tarjetaNueva: tarj,
      }).subscribe((data: { [key: string]: any }) => {
        console.log(data);
      });
  }

  quitarTarjeta(tarj: tarjeta){
    this.TARJETAS.splice(this.TARJETAS.indexOf(tarj), 1);
    //delete a la webapi
  }

  enviarVoto() {
    this.votoEnviado = true;
  }

  resetVoto() {
    this.votoEnviado = false;
  }

  sumarPuntos(tarj: tarjeta) {
    tarj.puntos++;
    this.puntajes[tarj.id] = tarj.puntos;
  }

  restarPuntos(tarj: tarjeta) {
    tarj.puntos--;
    console.log(tarj.puntos);
  }

  //Función para cambiar la tarjeta cada 20 segundos
  cambiarTarjeta() {
    this.resetVoto();
    this.cambio = setTimeout(() => {
      if(this.tarjetaActual < this.TARJETAS.length - 1){
        this.tarjetaActual++;
      } else {
        this.finalizarVotacion();
        this.estadoVotacion = false; // Llama a finalizarVotacion al final de las tarjetas
        return; //Para no seguir cambiando tarjetas
      }
      this.cambiarTarjeta(); // Llama a cambiarTarjeta() cada 20 segundos
  }, 20000);
}

//Funcion para calcular la tarjeta mas votada
calcularTarjetaMasVotada() {
  let tarjetaMasVotada: tarjeta | null = null;
  let puntajeMasAlto = 0;
  for (let tarjeta of this.TARJETAS) {
    if (tarjeta.puntos > puntajeMasAlto) {
      tarjetaMasVotada = tarjeta;
      puntajeMasAlto = tarjeta.puntos;
    }
  }
  console.log("Tarjeta más votada:", tarjetaMasVotada);
  if (this.TARJETAS.length === 0) {
    console.log("No hay tarjetas seleccionadas");
  }
  return tarjetaMasVotada;
}
  //Funcion para finalizar la votacion de tarjetas y mostrar el puntaje
  finalizarVotacion(){
    this.tarjetaMasVotada = this.calcularTarjetaMasVotada();
    this.mostrarPuntaje = true;
  }

  //para resetear la lista de tarjetas seleccionadas
  resetSeleccionadas(){
    this.tarjetasSeleccionadas = [];
  }
}

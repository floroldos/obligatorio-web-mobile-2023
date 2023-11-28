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

  private urlPost = `${url}/api/crearActividad`;

  private urlGet = `${url}/api/actividad`;

  id: number = 0; //para asignarle un id a cada tarjeta
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
    tarj.tema = (tema.value).toString();
    tarj.id_tarjeta = this.id; // es auto inncremental, ni idea algo asi, lo borramos?

    this.id ++; 
    this.http.post( 
      this.urlPost, {
        tarjetaNueva: tarj,
      }).subscribe((data: { [key: string]: any }) => {
        console.log(data);
      });
  }

  quitarTarjeta(tarj: tarjeta){
    this.http.delete(`${this.urlGet}/${tarj.id_tarjeta}`).subscribe((data: { [key: string]: any }) => {
      console.log(data);
    });
  }
}

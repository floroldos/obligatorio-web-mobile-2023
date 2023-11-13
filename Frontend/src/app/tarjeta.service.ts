import { Injectable } from '@angular/core';
import { tarjeta } from './tarjeta';
import { Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from './enviorment';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  constructor(private http: HttpClient) { }

  private url_tarjetas = `${url}/api/tarjetas`;
  
  TARJETAS: tarjeta[] = [
    {id: -1,
      nombre: 'miamsi',
      descripcion: 'aaa',
      imagen: 'assets/img.png',
      puntos: 0,
      tema: 'el pepe'},

    {id: -1,
      nombre: 'pepe',
      descripcion: 'asdasdasd',
      imagen: 'assets/img.png',
      puntos: 0,
      tema: 'el pepe'},
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

  @Input() contenedor: tarjeta = {
    id: -1,
    nombre: '',
    descripcion: '',
    imagen: '',
    puntos: 0,
    tema: ''};

  ngOnInit() : void{
    this.getTarjetas();
    this.tarjetaTemporizador();
  }
  
  ngOnDestroy() {
    // Detiene el timer cuando el componente se destruye
    clearTimeout(this.cambio);
  }
   
  //Get para obtener las tarjetas de la webapi
  getTarjetas() {
    //get a la webapi
    this.url_tarjetas = `http://${url}:3000/api/tarjetas`;	
    return this.http.get(url);
  }

  //Para agregar tarjetas a la lista de tarjetas existentes
  agregarTarjeta(tarj: tarjeta){
    console.log(tarj.nombre)
    tarj.id = this.id;
    this.id ++;
    this.TARJETAS.push(tarj);
    //push a la webapi
  }

  quitarTarjeta(tarj: tarjeta){
    this.TARJETAS.splice(this.TARJETAS.indexOf(tarj), 1);
    //delete a la webapi
  }

  enviarVoto() {
    //enviar a la webapi
    this.votoEnviado = true;
  }

  sumarPuntos(tarj: tarjeta) {
    tarj.puntos++;
    this.puntajes[tarj.id] = tarj.puntos;
  }

  restarPuntos(tarj: tarjeta) {
    tarj.puntos--;
    console.log(tarj.puntos);
  }

  tarjetaTemporizador() {
    this.cambiarTarjeta(); // Inicia el primer cambio de tarjeta
  }

  //Función para cambiar la tarjeta cada 20 segundos
  cambiarTarjeta() {
    this.cambio = setTimeout(() => {
      if(this.tarjetaActual < this.tarjetasSeleccionadas.length - 1){
        this.tarjetaActual++;
      } else {
        this.finalizarVotacion(); // Llama a finalizarVotacion al final de las tarjetas
        return; //Para no seguir cambiando tarjetas
      }
      this.cambiarTarjeta(); // Llama a cambiarTarjeta() cada 20 segundos
  }, 20000);
}

//Funcion para calcular la tarjeta mas votada
  calcularTarjetaMasVotada() {
    let tarjetaMasVotada: tarjeta | null = null;
    let puntajeMasAlto = 0;
    for (let tarjeta of this.tarjetasSeleccionadas) {
      if (tarjeta.puntos > puntajeMasAlto) {
      tarjetaMasVotada = tarjeta;
      puntajeMasAlto = tarjeta.puntos;
      }
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
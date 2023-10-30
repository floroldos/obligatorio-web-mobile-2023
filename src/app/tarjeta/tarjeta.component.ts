import { Component } from '@angular/core';
import { TarjetaService } from '../tarjeta.service';
import { tarjeta } from '../tarjeta';


@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent{

  listaTarjetas: tarjeta[] = [];
  votoEnviado: boolean = false; //para mostrar el mensaje de voto enviado
  tarjetaActual: number = 0; //lleva control de la tarjeta actual para el timeout
  cambio: any; //variable para el timeout, para que cambie la tarjeta cada 30 segundos
  mostrarPuntaje: boolean = false; //para mostrar el puntaje si ya pasaron todas las tarjetas
  puntajes: { [tarjetaId: number]: number } = {}; //para guardar los puntajes de cada tarjeta
  tarjetaMasVotada: tarjeta | null = null;

//la_mama_de_ana_she
  tarjeta: tarjeta = {
    id: 1,
    nombre: 'Sample Tarjeta',
    descripcion: 'A sample tarjeta',
    imagen: 'sample.jpg',
    puntos: 0,
    tema: ''
  };
  constructor(private tarjetaService: TarjetaService) { }

  ngOnInit() : void{
    this.getLista();
    this.tarjetaTemporizador();
  }

  ngOnDestroy() {
    // Detiene el timer cuando el componente se destruye
    clearTimeout(this.cambio);
  }

  getLista(): void {
    this.listaTarjetas = this.tarjetaService.getTarjetas();
  }

  agregarTarjeta(tarj: tarjeta){
    this.tarjetaService.agregarTarjeta(tarj);
  }

  quitarTarjeta(tarj: tarjeta){
    tarj.puntos = 0;
    this.tarjetaService.quitarTarjeta(tarj);
  }

  enviarVoto() {
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

cambiarTarjeta() {
    this.cambio = setTimeout(() => {
      if (this.tarjetaActual < this.listaTarjetas.length - 1) {
        this.tarjetaActual++;
      } else {
        this.finalizarVotacion(); // Llama a finalizarVotacion al final de las tarjetas
        return; // Evita continuar cambiando las tarjetas
      }
      this.cambiarTarjeta(); // Programa el siguiente cambio de tarjeta
    }, 30000); // Cambia la tarjeta cada 30 segundos
  }
  
calcularTarjetaMasVotada() {
  let tarjetaMasVotada: tarjeta | null = null;
  let puntajeMasAlto = -1;

  for (const tarjeta of this.listaTarjetas) {
    const puntaje = this.puntajes[tarjeta.id] || 0;
    if (puntaje > puntajeMasAlto) {
      tarjetaMasVotada = tarjeta;
      puntajeMasAlto = puntaje;
    }
  }

  return tarjetaMasVotada;
}

finalizarVotacion() {
  this.tarjetaMasVotada = this.calcularTarjetaMasVotada();
  this.mostrarPuntaje = true;
}

}
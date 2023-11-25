import { Component } from '@angular/core';
import { TarjetaService } from '../tarjeta.service';
import { tarjeta } from '../tarjeta';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent{

  listaTarjetas: tarjeta[] = this.tarjetaService.TARJETAS;

//la_mama_de_ana_she
  tarjeta: tarjeta = {
    id_tarjeta: 1,
    nombre: 'Sample Tarjeta',
    descripcion: 'A sample tarjeta',
    imagen: 'sample.jpg',
    puntos: 0,
    tema: ''
  };
  constructor(public tarjetaService: TarjetaService) { }

  ngOnInit() : void{
    this.tarjetaService.tarjetaActual = 0;
    this.tarjetaService.cambiarTarjeta();
  }

  ngOnDestroy() {
    // Detiene el timer cuando el componente se destruye
    clearTimeout(this.tarjetaService.cambio);
  }

  agregarTarjeta(tarj: tarjeta){
    this.tarjetaService.agregarTarjeta(tarj);
  }

  quitarTarjeta(tarj: tarjeta){
    tarj.puntos = 0;
    this.tarjetaService.quitarTarjeta(tarj);
  }

  enviarVoto() {
    this.tarjetaService.enviarVoto();
   }

  sumarPuntos(tarj: tarjeta) {
    this.tarjetaService.sumarPuntos(tarj);
  }

  restarPuntos(tarj: tarjeta) {
    this.tarjetaService.restarPuntos(tarj);
  }

  cambiarTarjeta() {
    this.tarjetaService.cambiarTarjeta();
  }
  
  calcularTarjetaMasVotada() {
  this.tarjetaService.calcularTarjetaMasVotada();
  }

  finalizarVotacion() {
    this.tarjetaService.finalizarVotacion();
  }

  
}
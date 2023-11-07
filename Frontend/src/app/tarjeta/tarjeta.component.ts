import { Component } from '@angular/core';
import { TarjetaService } from '../tarjeta.service';
import { tarjeta } from '../tarjeta';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent{

  listaTarjetas: any;

//la_mama_de_ana_she
  tarjeta: tarjeta = {
    id: 1,
    nombre: 'Sample Tarjeta',
    descripcion: 'A sample tarjeta',
    imagen: 'sample.jpg',
    puntos: 0,
    tema: ''
  };
  constructor(public tarjetaService: TarjetaService) { }

  ngOnInit() : void{
    this.tarjetaService.getTarjetas().subscribe((data) => {
      this.listaTarjetas = data;
      console.log(this.listaTarjetas);
    });
    this.tarjetaTemporizador();
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

  tarjetaTemporizador() {
    this.tarjetaService.cambiarTarjeta(); // Inicia el primer cambio de tarjeta
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
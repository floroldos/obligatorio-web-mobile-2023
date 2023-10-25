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
  votoEnviado: boolean = false;
  tarjetaActual: number = 0;
  cambio: any;
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
    console.log(tarj.puntos);
  }

  restarPuntos(tarj: tarjeta) {
    tarj.puntos--;
    console.log(tarj.puntos);
  }

  tarjetaTemporizador() {
    this.cambio.setInterval(() => {
      this.cambiarTarjeta
    }, 30000);
  }

  cambiarTarjeta(){
    if (this.tarjetaActual < this.listaTarjetas.length -1){
      this.tarjetaActual++;
    } else {
      this.tarjetaActual = 0;
    }
  }
}
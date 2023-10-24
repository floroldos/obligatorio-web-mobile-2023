import { Component } from '@angular/core';
import { TarjetaService } from '../tarjeta.service';
import { tarjeta } from '../tarjeta';


@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent {
  listaTarjetas: tarjeta[] = [];
  votoEnviado: boolean = false;

  tarjeta: tarjeta = {
    id: 1,
    nombre: 'Sample Tarjeta',
    descripcion: 'A sample tarjeta',
    imagen: 'sample.jpg',
    puntos: 0
  };

  constructor(private tarjetaService: TarjetaService) { }

  ngOnInit() : void{
    this.getLista();
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
}
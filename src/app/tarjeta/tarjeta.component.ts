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

  constructor(private tarjetaService: TarjetaService) { }

  ngOnInit() : void{
    this.getLista();
  }

  getLista(): void {
    this.listaTarjetas = this.tarjetaService.getTarjetas();
  }

  agregarTarjeta(tarj:tarjeta){
    this.tarjetaService.agregarTarjeta(tarj);
  }

  quitarTarjeta(tarj: tarjeta){
    this.tarjetaService.quitarTarjeta(tarj);
  }
}
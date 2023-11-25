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
    id: 1,
    nombre: 'Sample Tarjeta',
    descripcion: 'A sample tarjeta',
    imagen: 'sample.jpg',
    puntos: 0,
    tema: ''
  };

    id: number = 0;
    puntos: number = 0;
    votoEnviado: boolean = false; //para mostrar el mensaje de voto enviado
    tarjetaActual: number = 0; //lleva control de la tarjeta actual para el timeout
    cambio: any; //variable para el timeout, para que cambie la tarjeta cada 30 segundos
    mostrarPuntaje: boolean = false; //para mostrar el puntaje si ya pasaron todas las tarjetas
    puntajes: { [tarjetaId: number]: number } = {}; //para guardar los puntajes de cada tarjeta
    tarjetaMasVotada: tarjeta | null = null;
    estadoVotacion: boolean = true;
    
  constructor(public tarjetaService: TarjetaService) { }

  ngOnInit() : void{
    
  }

  ngOnDestroy() {
    // Detiene el timer cuando el componente se destruye
  }

  enviarVoto() {
   }

  sumarPuntos(tarj: tarjeta) {
  }

  restarPuntos(tarj: tarjeta) {
  }

  cambiarTarjeta() {
  }
  
  calcularTarjetaMasVotada() {
  }

  finalizarVotacion() {
  } 

  
}
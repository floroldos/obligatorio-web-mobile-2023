import { Component } from '@angular/core';
import { TarjetaService } from '../tarjeta.service';
import { tarjeta } from '../tarjeta';
import { SalaService } from '../sala.service';
import { Socket, io } from 'socket.io-client';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent{

  listaTarjetas: tarjeta[] = this.tarjetaService.TARJETAS;

  tarjeta: tarjeta = {
    id_tarjeta: 1,
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
    wSocket!: Socket;
    estadoVotacion: boolean = true;
    
  constructor(public salaService: SalaService, public tarjetaService: TarjetaService) { }

  ngOnInit() : void{
    this.connectSocket();
  }

  ngOnDestroy() {
  }

  sumarPuntos(tarj: tarjeta) {
    this.wSocket.emit('sumarPuntos', {"tarjeta": tarj}, {'user': this.salaService.nickname});
  }

  restarPuntos(tarj: tarjeta) {
    this.wSocket.emit('restarPuntos', {"tarjeta": tarj}, {'user': this.salaService.nickname});
  }

  startAnimation() {
    var element = document.querySelector('.barra');
    if (element) {
      element.classList.add('start-animation');
    }
  }

  stopAnimation() {
    var element = document.querySelector('.barra');
    if (element) {
      element.classList.remove('start-animation');
    }
  }

  connectSocket() {
    this.wSocket = io("ws://localhost:3001/game", { 
      transports: ['websocket']
    });
    
    this.wSocket.on('cambiarTarjeta', (data: { [key: string]: any}) => {
      this.tarjetaActual = data['tarjeta'];
      this.startAnimation();
    })

    this.wSocket.on('finalizarVotacion', (data: { [key: string]: any}) => { 
      this.estadoVotacion = false;
      this.tarjetaMasVotada = data['tarjetaMasVotada'];
    })
  }

  
  
}
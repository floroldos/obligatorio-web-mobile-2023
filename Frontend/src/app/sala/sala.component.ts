import { Component, OnInit } from '@angular/core';
import { sala } from '../sala';
import { SalaService } from '../sala.service';
import { Router } from '@angular/router';
import { TarjetaService } from '../tarjeta.service';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login.service';
import { Socket, io } from 'socket.io-client';
//import { clear } from 'console';
//import { timer } from 'rxjs';


@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})

export class SalaComponent implements OnInit {
  listaSalas: sala[] = [];
  juegoActivo = false;
  newMessage = '';
  messageList: string[] = [];
  countdown = 0;
  wSocket!: Socket;
  jugadores: string[] = [];

  constructor(public salaService: SalaService, private router: Router, private http: HttpClient, public loginService: LoginService, public tarjS: TarjetaService) { }

  ngOnInit() {
    this.updateSala();
    this.connectSocket();
    this.jugadores = this.salaService.jugadores; 
  }

  updateSala(){
    this.salaService.updateSala();
  }

  connectSocket() {
    this.wSocket = io("ws://localhost:3001/game", { 
      transports: ['websocket']
    });
    
    this.wSocket.on('connected', (data: { [key: string]: any}) => {
      if(data['ok'] == 'ok'){
        console.log("Conectado al servidor");
        console.log("emitiendo : " + this.salaService.nickname);
        this.wSocket.emit('addUser', {"user": this.salaService.nickname});
      }
    });

    this.wSocket.on('actualizarJugadores', (data: { [key: string]: any}) => {
      this.jugadores = data['jugadores'];
      console.log(this.jugadores);
    });

    this.wSocket.on('empezarPartida', (data: { [key: string]: any}) => {
      this.juegoActivo = true;
      this.iniciarJuego();
      console.log("empezar");
    });

    this.wSocket.on('ping', () => {
      console.log('Recibido Ping del servidor');
      // Responder con Pong al servidor
      this.wSocket.emit('pong');
  });

    this.wSocket.on('mensajeNuevo', (data: { [key: string]: any}) => {
      console.log("mensaje recibido: " + data['message']);
      this.messageList.push(data['message']);
    });

    const comprobarConexion = () => {
      const timer = setTimeout(() => {
          
      }, 4000);
    };

    setInterval(comprobarConexion, 5000);

  }

  setUser(nickname: string) {
    this.salaService.setUser(nickname);
  }

  empezarPartida() {
    this.wSocket.emit('empezar');
  }

  iniciarJuego() {
    setTimeout(() => {
      this.router.navigate(['../tarjeta']);
    }, 1000);  // Espera 5 segundos

  }

  sendMessage() {
    this.newMessage = this.salaService.nickname + ': ' + this.newMessage;
    this.wSocket.emit('mensajeEnviado', { message: this.newMessage });
    this.newMessage = '';
  }

}

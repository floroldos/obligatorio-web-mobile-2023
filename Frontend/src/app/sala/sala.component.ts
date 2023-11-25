import { Component, OnInit } from '@angular/core';
import { sala } from '../sala';
import { SalaService } from '../sala.service';
import { Router } from '@angular/router';
import { TarjetaService } from '../tarjeta.service';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login.service';
import { Socket, io } from 'socket.io-client';


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
  socket!: Socket;
  jugadores: string[] = [];

  constructor(public salaService: SalaService, private router: Router, private http: HttpClient, public loginService: LoginService, public tarjS: TarjetaService) { 
    this.socket = this.socket;
  }

  ngOnInit() {
    this.updateSala();
    this.connectSocket();
    this.jugadores = this.salaService.jugadores; 
  }

  updateSala(){
    this.salaService.updateSala();
  }

  connectSocket() {
    console.log("Conectando websocket");
    const socketUrl = `ws://127.0.0.1:3001`;

    this.socket = io(socketUrl, { 
      transports: ['websocket'] 
    });
    
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
    });
    this.socket.on('actualizarJugadores', (data: { [key: string]: any}) => {
      this.jugadores = data['jugadores'];
      console.log(this.jugadores);
    });
  }

  sendMessage() {
    //this.salaService.sendMessage(this.newMessage);
    this.newMessage = '';
  }

  setUser(nickname: string) {
    this.salaService.setUser(nickname);
  }

  iniciarJuego() {
    this.salaService.inicializarSala();
    console.log(this.salaService.contenedor.codigoSala);
    this.socket.emit('empezar');
  
    setTimeout(() => {
      this.router.navigate(['../tarjeta']);
    }, 3000);  // Espera 5 segundos
  }

  empezarPartida(){
    this.salaService.empezarPartida();
  }
  
}

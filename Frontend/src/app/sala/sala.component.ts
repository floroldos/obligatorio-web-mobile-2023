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


  }

  setUser(nickname: string) {
    this.salaService.setUser(nickname);
  }

  iniciarJuego() {
    this.salaService.inicializarSala();
    console.log(this.salaService.contenedor.codigoSala);
    this.wSocket.emit('empezar');
  
    setTimeout(() => {
      this.router.navigate(['../tarjeta']);
    }, 3000);  // Espera 5 segundos
  }

  empezarPartida(){
    this.salaService.empezarPartida();
  }
  
}

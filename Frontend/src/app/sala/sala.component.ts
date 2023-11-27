import { Component, OnInit } from '@angular/core';
import { sala } from '../sala';
import { SalaService } from '../sala.service';
import { Router } from '@angular/router';
import { TarjetaService } from '../tarjeta.service';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login.service';
import { Socket, io } from 'socket.io-client';
import { urlPersona } from '../enviorment';
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
  private timeoutId: number | null = null;

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
    this.wSocket = io("ws://"+urlPersona+":3001/game", {

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
    });

    this.wSocket.on('empezarPartida', (data: { [key: string]: any}) => {
      this.juegoActivo = true;
      this.iniciarJuego();
      console.log("empezar");
    });

    this.wSocket.on('mensajeNuevo', (data: { [key: string]: any}) => {
      if (data['user'] == this.salaService.nickname) {
        this.messageList.push("(YOU): " + data['message']);
      }else{
        this.messageList.push(data['user'] + ": " + data['message']);
      }
    });

    this.wSocket.on('comprobarJugadores', (data: { [key: string]: any}) => {
      this.wSocket.emit('addUser', { 'user': this.salaService.nickname });
    });

  }

  setUser(nickname: string) {
    this.salaService.setUser(nickname);
  }

  empezarPartida() {
    console.log(this.salaService.contenedor.propuesta);
    console.log("empezar: ", this.salaService.contenedor.propuesta);
    this.wSocket.emit('empezar', { 'tema' : this.salaService.contenedor.propuesta});
  }

  iniciarJuego() {
      this.router.navigate(['../tarjeta']);
  }

  sendMessage() {
    this.newMessage = this.newMessage;
    var usuario = this.salaService.nickname;
    this.wSocket.emit('mensajeEnviado', { "message": this.newMessage , "user": usuario });
    this.newMessage = '';
  }

}

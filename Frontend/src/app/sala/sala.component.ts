import { Component, OnInit } from '@angular/core';
import { sala } from '../sala';
import { SalaService } from '../sala.service';
import { Router } from '@angular/router';
import { TarjetaService } from '../tarjeta.service';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';
import { LoginService } from '../login.service';

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

  constructor(public salaService: SalaService, private router: Router, private http: HttpClient, public loginService: LoginService, public tarjS: TarjetaService) {  }

  updateSala(){
    this.salaService.updateSala();
  }

  updateJugadores(){
      this.salaService.updateJugadores();
  }
  
  ngOnInit() {
    this.salaService.codigoSalaUsuario = this.salaService.contenedor.codigoSala;
    this.updateSala();
    this.salaService.socket.emit('jugadores');
    this.updateJugadores();
    this.salaService.getMessages((message: { user: string, message: string }) => {
      this.messageList.push(`${message.user}: ${message.message}`);
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
  //Muestra la primera actividad cuando empieza el juego
    this.salaService.inicializarSala();
    this.salaService.juegoActivo = true;
    console.log(this.salaService.contenedor.codigoSala);
    this.salaService.socket.emit('empezar');
    this.router.navigate(['../tarjeta']);
  }
}

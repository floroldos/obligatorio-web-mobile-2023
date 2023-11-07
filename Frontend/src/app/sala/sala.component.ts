import { Component } from '@angular/core';
import { sala } from '../sala';
import { SalaService } from '../sala.service';
import { Router } from '@angular/router';
import { TarjetaService } from '../tarjeta.service';
import { HttpClient } from '@angular/common/http';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent {
  listaSalas: sala[] = [];
  juegoActivo: false;
  socket!: Socket;
  chatMessages: { username: string; message: string }[] = [];
  username: string = '';

  constructor(public salaService: SalaService, private router: Router, private http: HttpClient) {
    this.juegoActivo = false;
  }

  tarjS: TarjetaService = new TarjetaService(this.http);

ngOnInit(): void {
  this.socket = io('ws://192.168.1.2:3001/game', { transports: ['websocket'] });

  this.socket.on('message', (data: any) => {
    console.log(data);
    this.chatMessages.push(data); 
  });
}

  sendMessage(message: string) {
    this.socket.emit('message', { username: this.username, message: message });
  }

  setUser(username: string) {
    this.username = username; 
  }

  iniciarJuego() {
    //Muestra la primera actividad cuando empieza el juego
    this.salaService.crearSala();
  }
}

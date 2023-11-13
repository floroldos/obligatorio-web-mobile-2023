import { Component, Input } from '@angular/core';
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
  juegoActivo = false;

  constructor(public salaService: SalaService, private router: Router, private http: HttpClient) {  }

  updateSala(){
    this.salaService.getSala().subscribe(
      (data) => {
        this.salaService.contenedor = data.variable;
        console.log(this.salaService.contenedor);
      },
      (error) => {
        console.error('Error obteniendo la sala: ', error);
      }
    );
  }

  ngOnInit(): void {
    this.updateSala();
  }

  tarjS: TarjetaService = new TarjetaService(this.http);

  sendMessage(message: string) {
    this.salaService.sendMessage(message);
  }

  setUser(nickname: string) {
    this.salaService.setUser(nickname);
  }

  iniciarJuego() {
  //Muestra la primera actividad cuando empieza el juego
    this.salaService.inicializarSala();
    this.salaService.juegoActivo = true;
    console.log(this.salaService.contenedor.codigoSala);
}
}

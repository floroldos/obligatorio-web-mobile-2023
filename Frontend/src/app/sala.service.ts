import { Injectable, Input, ViewChild } from '@angular/core';
import { sala } from './sala';
import { Router, NavigationExtras } from '@angular/router';
import { TarjetaService } from './tarjeta.service';
import { tarjeta } from './tarjeta';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { LobbyComponent } from './lobby/lobby.component';
import { HttpClient } from '@angular/common/http';
import { SalaComponent } from './sala/sala.component';
import { io, Socket } from 'socket.io-client';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})

export class SalaService {
  constructor(private router: Router, private http: HttpClient) { 
    console.log("Sala service constructor");
    this.socketConnection();
  }

  SALAS: sala[] = [];
  juegoActivo: boolean = false;
  codigoSalaUsuario: number = -1;
  tarjS = new TarjetaService(this.http);
  loginS = new LoginService(this.router);
  socket!: Socket;
  url = 'http://localhost:3000/api/juego';

  private static contenedor: sala;

  public static getSala(): sala {
    if (!this.contenedor) {
      this.contenedor = {
        codigoSala: -1,
        propuesta: '',
        tarjetasSala: [],
        tarjetaActualSala: 0,
        estadoActual: false,
        jugadores: []
      };
    }
    return this.contenedor;
  }

  socketConnection() {
    console.log("Conectando a la basura de websocket");

    this.socket = io('ws://localhost:3000', {
      transports: ['websocket']
    });
  
    this.socket.on('connection', () => {
      console.log('Conectado al websocket');
  
      this.socket.on('message', (data: any) => {
        console.log(data);
        this.chatMessages.push(data); 
      });
    
      this.socket.on('navegar', (data: { [key: string]: any }) => {
        this.contenedor = data as sala;
      });
    
      this.socket.on('confirmar', (data: string[]) => {
        console.log(data);
        this.contenedor.jugadores = data;
      });
      
    });
  }

  usuarios: string[] = [];

  @Input() contenedor: sala = SalaService.getSala();


  //Funcion para codigo de sala random
  randomInt() {
    return Math.floor(Math.random() * (1001));
  }

  crearSala(){
    if(this.contenedor.propuesta != ''){
      this.contenedor.codigoSala = this.randomInt();
      this.contenedor.tarjetasSala = this.seleccionarTarjetas();
      this.socket.emit('crearSala', {'crearSala': this.contenedor});
      this.router.navigate(['../sala']);
      this.socket.emit('navegar');
    }
    else{
      alert('El juego debe tener un tema');
    }
  }

  inicializarSala(){
    this.juegoActivo = false;
    this.socket.emit('navegar', (data: any) =>{});
  }

  
  unirseAJuego() {
    if (this.codigoSalaUsuario == this.contenedor.codigoSala) {
      // Falta ver cómo se manejan los usuarios
      this.http.get(this.url);
      this.socket.emit('entrarSala', this.loginS.userName);

      this.router.navigate(['../sala']);
    } else {
      alert("codigo invalido");
    }
  }

seleccionarTarjetas(): tarjeta[]{
  let tema = this.contenedor.propuesta;
    for(let tarjeta of this.tarjS.TARJETAS){
      if(tarjeta.tema == tema){
        this.tarjS.tarjetasPorTema.push(tarjeta);
      }
    }

    let tarjDesordenadaws = this.shuffleArray(this.tarjS.tarjetasPorTema);
    for(let tarj of tarjDesordenadaws){
      if(this.tarjS.tarjetasSeleccionadas.length < 10){
        this.tarjS.tarjetasSeleccionadas.push(tarj);
      } 
    }
    return this.tarjS.tarjetasSeleccionadas;
  }

  //algoritmo para elegir tarjetas de forma random
  shuffleArray<T>(array: T[]): T[] {
    const newArray = array.slice(); // Create a copy of the original array to avoid modifying it directly
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Generate a random index between 0 and i
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements at i and j
    }
    return newArray;
  }

 // SOCKETS //
  sendMessage(message: string) {
    this.socket.emit('message', { nickname: this.loginS.userName , message: message });
  }

  setUser(nickname: string) {
    this.loginS.userName = nickname; 
  }

  chatMessages: { nickname: string; message: string }[] = [];
}


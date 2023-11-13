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
import { Observable } from 'rxjs';
import { url } from './enviorment'; 

@Injectable({
  providedIn: 'root'
})

export class SalaService {

  private url = `${url}/api/juego`; 
  constructor(private router: Router, private http: HttpClient) { 
    console.log("Sala service constructor");
    this.socketConnection();
  }

  SALAS: sala[] = [];
  juegoActivo: boolean = false;
  codigoSalaUsuario: number = -1;
  tarjS = new TarjetaService(this.http);
  loginS = new LoginService(this.router, this.http);
  socket!: Socket;

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

    this.socket = io('ws://10.13.202.4:3000', {
      transports: ['websocket'] 
    });
  
    this.socket.on('connection', () => {
      console.log('Conectado al websocket');
  
      this.socket.on('message', (data: any) => {
        console.log(data);
        this.chatMessages.push(data); 
      });
      
    });
  }

  @Input() contenedor: sala = SalaService.getSala();


  //Funcion para codigo de sala random
  randomInt() {
    return Math.floor(Math.random() * (1001));
  }

  crearSala(){
    if(this.contenedor.propuesta != ''){
      this.contenedor.codigoSala = this.randomInt();
      this.contenedor.tarjetasSala = this.seleccionarTarjetas();
      this.http.post(this.url, this.contenedor)  
      .subscribe(
        response => {
          console.log('Respuesta:', response);
        },
        error => {
          console.error('Error creando la sala:', error);
        }
      );

      this.router.navigate(['../sala']);
    }
    else{
      alert('El juego debe tener un tema');
    }
  }

  getSala(): Observable<any>{
    return this.http.get<any>(this.url); 
  }

  inicializarSala(){
    this.juegoActivo = false;
  }
  
  unirseAJuego() {
    console.log(this.codigoSalaUsuario);
    console.log(this.contenedor.codigoSala);
    if ((this.codigoSalaUsuario === this.contenedor.codigoSala) && (this.codigoSalaUsuario !== -1)) {
      // Falta ver cómo se manejan los usuarios
      this.socket.emit('entrarSala', {'entrarSala': this.loginS.username});
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
    this.socket.emit('message', { nickname: this.loginS.username , message: message });
  }

  setUser(nickname: string) {
    this.loginS.username = nickname; 
  }

  chatMessages: { nickname: string; message: string }[] = [];
}


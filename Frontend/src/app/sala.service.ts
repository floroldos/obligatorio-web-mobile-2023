import { Injectable, Input, ViewChild } from '@angular/core';
import { sala } from './sala';
import { Router } from '@angular/router';
import { TarjetaService } from './tarjeta.service';
import { tarjeta } from './tarjeta';
import { HttpClient } from '@angular/common/http';
import { io, Socket } from 'socket.io-client';
import { LoginService } from './login.service';
import { url } from './enviorment';


@Injectable({
  providedIn: 'root'
})

export class SalaService {

  private urlPost = `${url}/api/crearJuego`;
  private urlGet = `${url}/api/juego`;
  private urlGetJugadores = `${url}/api/jugadores`;
  constructor(private router: Router, private http: HttpClient) {
    console.log("Sala service constructor");
    this.socketConnection();
  }

  messageInput = document.getElementById('message-input');
  chatInput = document.getElementById('chat-input');

  juegoActivo: boolean = false;
  tarjS = new TarjetaService(this.http);
  loginS = new LoginService(this.router, this.http);
  public socket!: Socket;
  jugadores: string[] = [];

  private static contenedor: sala;

  public static getSala(): sala {
    if (!this.contenedor) {
      this.contenedor = {
        codigoSala: -1,
        propuesta: '',
        estadoActual: false,
        tarjetasSala: []
      };
    }
    return this.contenedor;
  }

  socketConnection() {
    console.log("Conectando websocket");
  
    const socketUrl = `ws://127.0.0.1:3001`;
  
    this.socket = io(socketUrl, {
      transports: ['websocket']
    });
  
    this.socket.on('connect', () => {
      console.log('websocket conectado!');
    });

  }

  @Input() contenedor: sala = SalaService.getSala();

  //Funcion para codigo de sala random
  randomInt() {
    return Math.floor(Math.random() * (1001));
  }

  haySala = false;

  checkSala(){
    if(this.haySala){
      return true;
    }
    else{
      return false;
    }
  }

  resetSala(id: string){
    this.http.delete(`${this.urlGet} + /${id}`);
  }

  crearSala() {
    if (this.contenedor.propuesta !== '' && !this.haySala) {
      this.contenedor.codigoSala = this.randomInt();
      console.log(this.contenedor);
      //this.contenedor.tarjetasSala = this.seleccionarTarjetas();
      this.http.post(this.urlPost, this.contenedor);
      this.router.navigate(['../sala']);
    }
    else {
      alert('El juego debe tener un tema');
    }
  }

  getJuego() {
    return this.http.get<sala>(this.urlGet);
  }

  // esto no anda hay que poner un emit del connect
  
  updateSala() {
    let observable = this.getJuego();
    observable.subscribe((data: any) => {
      if (data && data.length > 0) {
        this.contenedor = data[0]; // sala
      }
    });
  }

  agregarJugador(nickname : string){
    this.jugadores.push(nickname);
    this.socket.emit('jugadores');
    this.router.navigate(['../sala']);
  }

  inicializarSala() {
    this.juegoActivo = true;
  }

  empezarPartida(){
    this.socket.emit('empezar', {'tarjetas' : this.contenedor.tarjetasSala});
  }

  unirseAJuego() {
    //sacarlo de aca y poner q ingrese como parametro en el login component
    let element = document.getElementById('salacode') as HTMLInputElement;
    let nicknameInput = document.getElementById('nickname') as HTMLInputElement;
  
    if (element && nicknameInput) {
      let codigo = parseInt(element.value);
  
      if (isNaN(codigo) || codigo <= 0) {
        alert("El código de sala debe ser un número positivo");
      } else {
        if (this.contenedor.codigoSala === codigo) {
          this.agregarJugador(nicknameInput.value);
        } else {
          alert("La sala con el código proporcionado no existe");
        }
      }
    } else {
      alert("Ingrese un código y un nickname");
    }
  }
  
/*  seleccionarTarjetas(): tarjeta[] {
    let tema = this.contenedor.propuesta;
    for (let tarjeta of this.tarjS.TARJETAS) {
      if (tarjeta.tema == tema) {
        this.tarjS.tarjetasPorTema.push(tarjeta);
      }
    }
    let tarjDesordenadas = this.shuffleArray(this.tarjS.tarjetasPorTema);
    for (let tarj of tarjDesordenadas) {
      if (this.tarjS.tarjetasSeleccionadas.length < 10) {
        this.tarjS.tarjetasSeleccionadas.push(tarj);
      }
    }
    return this.tarjS.tarjetasSeleccionadas;
  }  */

  //algoritmo para elegir tarjetas de forma random
  shuffleArray<T>(array: T[]): T[] {
    const newArray = array.slice(); // Create a copy of the original array to avoid modifying it directly
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Generate a random index between 0 and i
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements at i and j
    }
    return newArray;
  }

  displayMessage(message: string) {
    const div = document.createElement('div');
    div.textContent = message;
    const chatMessagesDiv = document.getElementById("chat-messages");
    if (chatMessagesDiv) {
      chatMessagesDiv.appendChild(div);
    } else {
      console.error("Element with ID 'chat-messages' not found");
    }
  }

  // SOCKETS //
  navegar(){
    this.socket.on('navegar', (data: any) =>{
      this.router.navigate([data]);
    });
  }
  
  sendMessageSocket(message: string) {
    this.socket.emit('send-message', { user: this.loginS.username, message: message });
  }
  
  getMessages(callback: (data: { user: string, message: string }) => void) {
    this.socket.on('receive-message', (data) => {
      callback(data);
    });
  
    return () => {
      this.socket.disconnect();
    };
  }

  setUser(nickname: string) {
    localStorage.setItem('username', nickname);
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }  

}


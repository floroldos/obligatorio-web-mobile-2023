import { Injectable, Input, ViewChild } from '@angular/core';
import { sala } from './sala';
import { Router } from '@angular/router';
import { TarjetaService } from './tarjeta.service';
import { tarjeta } from './tarjeta';
import { HttpClient } from '@angular/common/http';
import { io, Socket } from 'socket.io-client';
import { LoginService } from './login.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { url } from './enviorment';


@Injectable({
  providedIn: 'root'
})

export class SalaService {

  private urlPost = `${url}/api/crearJuego`;
  private urlGet = `${url}/api/juego`;
  constructor(private router: Router, private http: HttpClient) {
    console.log("Sala service constructor");
    this.socketConnection();
  }

  SALAS: sala[] = [];
  juegoActivo: boolean = false;
  codigoSalaUsuario: number | null | undefined = -1;
  tarjS = new TarjetaService(this.http);
  loginS = new LoginService(this.router, this.http);
  socket!: Socket;

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
    this.http.delete(`${this.urlGet}+/${id}`);
  }

  crearSala() {
    if (this.contenedor.propuesta !== '' && !this.haySala) {
      this.contenedor.codigoSala = this.randomInt();
      console.log(this.contenedor);
      this.contenedor.tarjetasSala = this.seleccionarTarjetas();
      this.http.post(this.urlPost, this.contenedor)
        .subscribe((data: any) => {
          data['nombre']
          console.log("Juego creado");
          this.haySala = true;
          let idSala = data['_id'];
        });

      this.router.navigate(['../sala']);
    }
    else {
      alert('El juego debe tener un tema');
    }
  }

  getJuego() {
    return this.http.get<sala>(this.urlGet);
  }

  updateSala() {
    let observable = this.getJuego();
    observable.subscribe((data: any) => {
      if (data && data.length > 0) {
        this.contenedor = data[0];
        console.log(this.codigoSalaUsuario);
        console.log(this.contenedor.codigoSala);
        if (this.codigoSalaUsuario === this.contenedor.codigoSala) {
          // Falta ver cómo se manejan los usuarios
          this.socket.emit('entrarSala', { 'entrarSala': this.loginS.username });
          this.router.navigate(['../sala']);
        } else {
          alert("codigo invalido");
        }
      } else {
        console.error("No se recibieron datos");
      }
    });
  }

  inicializarSala() {
    this.juegoActivo = false;
  }

  unirseAJuego() {
    let element = document.getElementById('salacode') as HTMLInputElement;
    if(element){
      let codigo = parseInt(element.value);
      if(typeof(codigo) == 'number'){
        this.codigoSalaUsuario = codigo;
      }
      else{
        alert("El codigo debe ser un numero");
      }
    }
    else{
      alert("Ingrese un código");
    }
    this.updateSala();

  }

  seleccionarTarjetas(): tarjeta[] {
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
    this.loginS.username = nickname;
  }

}


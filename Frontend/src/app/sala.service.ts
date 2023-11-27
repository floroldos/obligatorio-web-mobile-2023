import { Injectable, Input, ViewChild } from '@angular/core';
import { sala } from './sala';
import { Router } from '@angular/router';
import { TarjetaService } from './tarjeta.service';
import { HttpClient } from '@angular/common/http';
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
  }

  messageInput = document.getElementById('message-input');
  chatInput = document.getElementById('chat-input');
  nickname: string = '';
  juegoActivo: boolean = false;
  tarjS = new TarjetaService(this.http);
  loginS = new LoginService(this.router, this.http);
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

  async crearSala() {
    if (this.contenedor.propuesta !== '' && !this.haySala) {
      this.contenedor.codigoSala = this.randomInt();
      this.contenedor.estadoActual = true;
      console.log(this.contenedor);
      //this.contenedor.tarjetasSala = this.seleccionarTarjetas();

      await this.http.post(this.urlPost, this.contenedor).subscribe((data: any) => {
        console.log(data);
        if(data['status'] === "created"){
          let codigo: string = data['code'];
          this.unirseAJuego(codigo, "admin");
        }else{
          alert('No se pudo crear la sala');
        }
      });
    }
    else {
      alert('El juego debe tener un tema');
    }
  }

  getJuego() {
    return this.http.get<sala>(this.urlGet);
  }

  // esto no anda hay que poner un emit del connect
  
  updateSala(): any {
    let observable = this.getJuego();

    observable.subscribe((data: any) => {
      if(data['codigoSala'] != -1){
        this.contenedor.codigoSala = data['codigoSala'];
        this.contenedor.propuesta = data['propuesta'];
        this.contenedor.estadoActual = data['estadoActual'];
        this.contenedor.tarjetasSala = data['tarjetasSala'];
        //this.haySala = true;
      }
    });
  }

  agregarJugador(nickname : string){
    this.jugadores.push(nickname);
    this.router.navigate(['../sala']);
  }

  async unirseAJuego(salaCode: string, nname: string) {
    //sala code es un string, lo quiero pasar a number or
    let codigo: number = parseInt(salaCode);
    this.nickname = nname;
    if (salaCode && this.nickname != '') {
      if (isNaN(codigo) || codigo <= 0) {
        alert("El código de sala debe ser un número positivo");
      } else {
        await this.http.get(this.urlGet).subscribe((data: any) => {

          this.contenedor.codigoSala = data['codigoSala'];
          this.contenedor.propuesta = data['propuesta'];
          this.contenedor.estadoActual = data['estadoActual'];
          this.contenedor.tarjetasSala = data['tarjetasSala'];

          if (this.contenedor.codigoSala === codigo) {
            this.agregarJugador(this.nickname);
          } else {
            alert("La sala con el código proporcionado no existe : " + this.contenedor.codigoSala);
          }
        });
      }
    }else {
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

  setUser(nickname: string) {
    localStorage.setItem('username', nickname);
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }  
}


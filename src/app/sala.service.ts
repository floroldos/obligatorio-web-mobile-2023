import { Injectable, Input, ViewChild } from '@angular/core';
import { sala } from './sala';
import { Router } from '@angular/router';
import { TarjetaService } from './tarjeta.service';
import { tarjeta } from './tarjeta';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { LobbyComponent } from './lobby/lobby.component';
  
@Injectable({
  providedIn: 'root'
})
export class SalaService {
  constructor(private router: Router) { }
  SALAS: sala[] = [];
  codigoSalaUsuario: number = -1;
  tarjS = new TarjetaService();

  @Input() contenedor: sala = {
    codigoSala: -1,
    propuesta: '',
    tarjetasSala: [],
    tarjetaActualSala: 0,
    estadoActual: false
  };

  //Funcion para codigo de sala random
  randomInt() {
    return Math.floor(Math.random() * (1001));
  }

  crearSala(){
    if(this.contenedor.propuesta != ''){
      this.contenedor.codigoSala = this.randomInt();
      console.log(this.contenedor.codigoSala);
      this.seleccionarTarjetas();
      this.router.navigate(['../sala']);
    }
    else{
      alert('El juego debe tener un tema');
    }
}
  
unirseAJuego() {
  if (this.codigoSalaUsuario == this.contenedor.codigoSala && this.codigoSalaUsuario != -1) {
    // Falta ver cómo se manejan los usuarios
    this.router.navigate(['../sala']);
  } else {
    alert("El código de sala es inválido");
  }
}

  /* unirseAJuego(){
 // Encuentra la sala de juego en la que el usuario está
 const salaUsuario = this.contenedor.salas.find(sala => sala.codigoSala === this.codigoSalaUsuario);

 if(salaUsuario){
    // Verifica si el usuario ya se encuentra en la sala de juego
    const usuarioEnSala = salaUsuario.usuarios.find(usuario => usuario.id === this.usuarioActual.id);

    if(usuarioEnSala){
      alert('El usuario ya se encuentra en la sala de juego');
    } else {
      // Añade el usuario a la sala de juego
      salaUsuario.usuarios.push(this.usuarioActual);

      // Redirige al usuario a la página de la sala de juego
      this.router.navigate(['../sala']);
    }
 } else {
    alert('Código de sala inválido'); */

  seleccionarTarjetas(){
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
  }

  shuffleArray<T>(array: T[]): T[] {
    const newArray = array.slice(); // Create a copy of the original array to avoid modifying it directly
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Generate a random index between 0 and i
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements at i and j
    }
    return newArray;
  }

}

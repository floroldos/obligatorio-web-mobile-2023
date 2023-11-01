import { Injectable, Input } from '@angular/core';
import { sala } from './sala';
import { Router } from '@angular/router';
import { TarjetaService } from './tarjeta.service';
import { tarjeta } from './tarjeta';
import { TarjetaComponent } from './tarjeta/tarjeta.component';


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
    return Math.floor(Math.random() * (101));
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
  
  unirseAJuego(){
      if(this.codigoSalaUsuario == this.contenedor.codigoSala && this.codigoSalaUsuario != -1){
        this.router.navigate(['../sala']);
      }
      else{
        alert('Código de sala inválido');
      }
  }

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

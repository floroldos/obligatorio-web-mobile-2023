import { Component } from '@angular/core';
import { sala } from '../sala';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent {

  sala: sala = {
    codigoSala: '1234',
    propuesta: 'Sample Propuesta - tipos de mati',
    tarjetasSala: ['Mati pelado', 'Mati con pelo', 'Mati con barba'],
    tarjetaActualSala: 'Sample Actividad Actual - tipos de mati'
  }
  iniciarJuego() {
    // Cuando el anfitrión inicia el juego, muestra la primera actividad.
    //tarjetaActualSala = tarjetasSala[0];
  }
}
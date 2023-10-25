import { Component } from '@angular/core';
import { sala } from '../sala';
import { SalaService } from '../sala.service';
@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent {
  listaSalas: sala[] = [];

  sala: sala = {
    codigoSala: '1234',
    propuesta: 'Sample Propuesta - tipos de mati',
    tarjetasSala: ['Mati pelado', 'Mati con pelo', 'Mati con barba'],
    tarjetaActualSala: 'Sample Actividad Actual - tipos de mati'
  };
  
  constructor(private salaService: SalaService) { }

  iniciarJuego() {
    // Cuando el anfitrión inicia el juego, muestra la primera actividad.
  }
}
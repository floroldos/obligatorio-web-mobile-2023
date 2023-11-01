import { Component } from '@angular/core';
import { sala } from '../sala';
import { SalaService } from '../sala.service';
import { Router } from '@angular/router';
import { TarjetaService } from '../tarjeta.service';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent {
  listaSalas: sala[] = [];

  
  constructor(public salaService: SalaService, private router: Router) { }

  tarjS: TarjetaService = new TarjetaService();

  iniciarJuego() {
    // Cuando el anfitrión inicia el juego, muestra la primera actividad.
    this.salaService.crearSala();
  }
}

import { Component } from '@angular/core';
import { sala } from '../sala';
import { SalaService } from '../sala.service';
import { Router } from '@angular/router';
import { TarjetaService } from '../tarjeta.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent {
  listaSalas: sala[] = [];

  
  constructor(public salaService: SalaService, private router: Router, private http: HttpClient) { }

  tarjS: TarjetaService = new TarjetaService(this.http);

  iniciarJuego() {
    // Cuando el anfitrión inicia el juego, muestra la primera actividad.
    this.salaService.crearSala();
  }

  
}

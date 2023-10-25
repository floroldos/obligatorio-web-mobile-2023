import { Component, Input } from '@angular/core';
import { TarjetaService } from '../tarjeta.service';
import { tarjeta } from '../tarjeta';
import { TemaService } from '../tema.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent {

  constructor() { }

  temaS = new TemaService();

  tarjS = new TarjetaService();

  @Input() temaContenedor: string = '';
  
  @Input() tarjContenedor: tarjeta = {
    id: -1,
    nombre: '',
    descripcion: '',
    imagen: '',
    puntos: 0,
    tema: ''
  };

}

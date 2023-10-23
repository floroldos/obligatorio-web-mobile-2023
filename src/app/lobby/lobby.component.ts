import { Component, Input } from '@angular/core';
import { TarjetaService } from '../tarjeta.service';
import { tarjeta } from '../tarjeta';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent {

  constructor(public tarjetaService: TarjetaService) { }

  get sharedObject() {
    return this.tarjetaService.contenedor;
 }

}

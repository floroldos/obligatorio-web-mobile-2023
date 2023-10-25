import { Injectable, Input } from '@angular/core';
import { sala } from './sala';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  constructor() { }

  SALAS: sala[] = [];
  codigoSala: string = '';

  @Input() contenedor: sala = {
    codigoSala: '',
    propuesta: '',
    tarjetasSala: [],
    tarjetaActualSala: 0
  };
}

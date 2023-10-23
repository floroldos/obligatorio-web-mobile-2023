import { Injectable } from '@angular/core';
import { tarjeta } from './tarjeta';
import { Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  constructor() { }
  
  TARJETAS: tarjeta[] = []
  id: number = 0;

  @Input() contenedor: tarjeta = {
    id: -1,
    nombre: '',
    descripcion: '',
    imagen: ''
  };
    
  getTarjetas(): tarjeta[] {
    //get a la webapi
    
    return this.TARJETAS;
  }

  agregarTarjeta(tarj: tarjeta){
    tarj.id = this.id;
    this.id ++;
    this.TARJETAS.push(tarj);
    //push a la webapi
  }

  quitarTarjeta(tarj: tarjeta){
    this.TARJETAS.splice(this.TARJETAS.indexOf(tarj), 1);
    //delete a la webapi
  }

  
  };

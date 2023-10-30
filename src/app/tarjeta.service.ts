import { Injectable } from '@angular/core';
import { tarjeta } from './tarjeta';
import { Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  constructor() { }
  
  TARJETAS: tarjeta[] = [
    {id: -1,
      nombre: 'miamsi',
      descripcion: 'aaa',
      imagen: 'assets/img.png',
      puntos: 0,
      tema: 'el pepe'},

    {id: -1,
      nombre: 'pepe',
      descripcion: 'asdasdasd',
      imagen: 'assets/img.png',
      puntos: 0,
      tema: 'el pepe'},
  ];
  id: number = 0;
  puntos: number = 0;

  @Input() contenedor: tarjeta = {
    id: -1,
    nombre: '',
    descripcion: '',
    imagen: '',
    puntos: 0,
    tema: ''}
  ;
    
  getTarjetas(): tarjeta[] {
    //get a la webapi
    
    return this.TARJETAS;
  }

  agregarTarjeta(tarj: tarjeta){
    console.log(tarj.nombre)
    tarj.id = this.id;
    this.id ++;
    this.TARJETAS.push(tarj);
    //push a la webapi
  }

  quitarTarjeta(tarj: tarjeta){
    this.TARJETAS.splice(this.TARJETAS.indexOf(tarj), 1);
    //delete a la webapi
  }
  }
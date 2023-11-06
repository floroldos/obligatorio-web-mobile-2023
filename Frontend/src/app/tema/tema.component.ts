import { Component } from '@angular/core';
import { TemaService } from '../tema.service';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})

export class TemaComponent {
  temas: string[] = [];
  constructor(private listaTemas: TemaService ) { }


  ngOnInit() : void{
    this.getTemas();
  }

  getTemas(): void {
    this.temas = this.listaTemas.getTemas();
  }

  addTema(tema: string) {
    this.listaTemas.addTema(tema);
  }

  delTema(tema: string) { 
    this.listaTemas.delTema(tema);
  }
}

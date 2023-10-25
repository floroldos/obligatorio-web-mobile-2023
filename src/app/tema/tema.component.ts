import { Component } from '@angular/core';
import { TemaService } from '../tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent {

  temas: string[] = [];

  constructor(private listaTemas: TemaService ) { }


  getTemas(): void {
    this.temas = this.listaTemas.getTemas();
  }

  ngOnInit() : void{
    this.getTemas();
  }


  addTema(tema: string) {
    this.listaTemas.addTema(tema);
  }

  delTema(tema: string) { 
    this.listaTemas.delTema(tema);
  }



}

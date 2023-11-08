import { Component, Input } from '@angular/core';
import { sala } from '../sala';
import { SalaService } from '../sala.service';
import  { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  activeTab: string = 'unirse-juego';

  constructor(public salaService: SalaService, public router: Router, public loginService: LoginService) {}

  login(){
    // verificar en la base de datos
    this.loginService.login();
  }

  changeTab(tab: string) {
    this.activeTab = tab;
  }

}

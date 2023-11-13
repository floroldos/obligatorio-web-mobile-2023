import { Component, Input } from '@angular/core';
import { sala } from '../sala';
import { SalaService } from '../sala.service';
import  { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  activeTab: string = 'unirse-juego';
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(public salaService: SalaService, public router: Router, public loginService: LoginService) {}

  login(): void {
    this.router.navigate(['/lobby']);
  }

  changeTab(tab: string) {
    this.activeTab = tab;
  }

}

import { Component, Input } from '@angular/core';
import { SalaService } from '../sala.service';
import  { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { SalaComponent } from '../sala/sala.component';
import { takeUntil } from 'rxjs/operators';
import { TemaService } from '../tema.service';

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

  constructor(public salaService: SalaService, public router: Router, public loginService: LoginService, private temaService: TemaService) {}

ngOnInit() {
    this.salaService.updateSala();
}

  login(): void {
    this.loginService.login(this.username, this.password).subscribe(
      (loginSuccessful) => {
        if (loginSuccessful) {
          console.log('Inicio de sesión exitoso')
          this.router.navigate(['../lobby']);
        } else {
          console.error('Inicio de sesión fallido. Verifica tus credenciales.');
        }
      },
      (error) => {
        console.error('Error durante el inicio de sesión:', error);
      }
    );
  }

  changeTab(tab: string) {
    this.activeTab = tab;
  }

}

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
    this.loginService.login(this.username, this.password).subscribe(
      response => {
        // Manejar la respuesta de la API y redirigir al usuario si es exitoso
        console.log(response);
        // Verificar si la autenticación fue exitosa antes de redirigir
        if (response.authenticated) {
          this.router.navigate(['/lobby']); // Redirigir a la ruta '/lobby'
        } else {
          // Manejar el caso en el que la autenticación no fue exitosa
          console.error('Autenticación fallida');
        }
      },
      error => {
        // Manejar el error de autenticación
        console.error(error);
      }
    );
  }

  changeTab(tab: string) {
    this.activeTab = tab;
  }

}

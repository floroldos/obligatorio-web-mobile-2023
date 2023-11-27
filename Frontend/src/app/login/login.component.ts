import { Component, Input } from '@angular/core';
import { SalaService } from '../sala.service';
import  { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { SalaComponent } from '../sala/sala.component';
import { takeUntil } from 'rxjs/operators';
import { TemaService } from '../tema.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { url } from '../enviorment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  activeTab: string = 'unirse-juego';
  username: string = '';
  password: string = '';
  private urlLogin = `${url}/api/user/confirmLogin`;
  private authToken: string | null = null;

  constructor(public salaService: SalaService, public router: Router, public loginService: LoginService, private temaService: TemaService, public http: HttpClient) {}

  ngOnInit() : void{
    this.salaService.updateSala();
  }

  login(username: string, password: string) {
    const payload = { adminName: username, adminPassword: password };
    const result = this.http.post<any>(`${this.urlLogin}`, payload).subscribe((data: any) => {
      if (data.error) {
        alert('Usuario o contraseña incorrectos');
      } else {
        this.router.navigate(['../lobby'])
      }});
  }

  setToken(token: string): void {
    this.authToken = token;
  }

  getToken(): string | null {
    return this.authToken;
  }

  changeTab(tab: string) {
    this.activeTab = tab;
  }

}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  username: string = '';
  email: string = '';
  password: string = '';
  url = 'http://192.168.1.5:3000/api';

  constructor(public router: Router, public http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    console.log('Intentando iniciar sesión para el usuario', username);
    return this.http.post(`${this.url}/login`, { username, password }); //HAY QYE AGREGAR EL ENDPOINT EN LA API
  }
}

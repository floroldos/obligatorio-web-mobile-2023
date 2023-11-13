import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { url } from './enviorment'; 


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  username: string = '';
  email: string = '';
  password: string = '';
  private url = `${url}/api/login`
  private authToken: string | null = null;

  constructor(public router: Router, public http: HttpClient) {}

  login(user: string): Observable<any> {
    return this.http.post(this.url, user);
  }

  setToken(token: string): void {
    this.authToken = token;
  }

  getToken(): string | null {
    return this.authToken;
  }

}

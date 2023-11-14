import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { url } from './enviorment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  username: string = '';
  email: string = '';
  password: string = '';
  private urlLogin = `${url}/api/user/login/?accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pQGFkbWluLmNvbSIsImlhdCI6MTY5OTk2MTcwM30.XtUa5WYFlP0EQVi56x9hrNuOZz6h0zh_5JjTSUuhRb8`
  private authToken: string | null = null;

  constructor(public router: Router, public http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    const payload = { userName: username, password: password };
    return this.http.post<any>(`${this.urlLogin}/login`, payload).pipe(
      map(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          return true;
        } else {
          return false;
        }
      })
    );
  }

  setToken(token: string): void {
    this.authToken = token;
  }

  getToken(): string | null {
    return this.authToken;
  }
}

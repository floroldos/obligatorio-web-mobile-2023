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
  private urlLogin = `${url}/api/user/login/?accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2OTkzNTY3Mjd9.3BsCgKEqlH-nO-k-NMQyMlIPeqM56P7QNx31vJozzvk`
  private authToken: string | null = null;

  constructor(public router: Router, public http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const payload = { userName: username, password: password };
    return this.http.post(`${this.urlLogin}/login`, payload);
  }

  setToken(token: string): void {
    this.authToken = token;
  }

  getToken(): string | null {
    return this.authToken;
  }

}

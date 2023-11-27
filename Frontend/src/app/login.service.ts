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
  password: string = '';
  private urlLogin = `${url}/api/user/confirmLogin`;
  private authToken: string | null = null;

  constructor(public router: Router, public http: HttpClient) {}

}

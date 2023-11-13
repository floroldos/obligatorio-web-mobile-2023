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
  //url = '${url}/api/user';

  constructor(public router: Router, public http: HttpClient) {}

  login(username: string, password: string){
    //HAY QYE AGREGAR EL ENDPOINT EN LA API
  }
}

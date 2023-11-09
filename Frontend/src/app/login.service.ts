import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { token,url } from './enviorment'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public router: Router) {}

  login(){
    this.router.navigate(['../lobby']);
  }
  // on init get
  //

  userName: string;
  email: string;
  password: string;

  url = `${url}/api/user`

}

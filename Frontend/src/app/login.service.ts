import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public router: Router) {}

  login(){
    this.router.navigate(['../lobby']);
  }

  userName: string = '';
  email: string = '';
  password: string = '';

  url = "http://10.13.230.206:3000/api/user"

}

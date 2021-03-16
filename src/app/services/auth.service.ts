import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor() {}
  
  logout(): void{
    localStorage.setItem('adminloggedin','false');
    localStorage.removeItem('username');
    localStorage.removeItem('pass');
    localStorage.removeItem('phone');
  }
}
import { Injectable } from '@angular/core';
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  public login(userInfo: User){
    localStorage.setItem('admin', "admin");
  }

  public isLoggedIn(){
    return localStorage.getItem('admin') !== null;

  }

  public logout(){
    localStorage.removeItem('admin');
  }
}

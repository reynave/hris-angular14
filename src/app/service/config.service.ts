import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { CookiesService } from './cookies.service';  
export class Document {
  msg: any;
  to: string = "";
  action: string = ""; 
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  

  varToken: string = "";
  varHeaders: any = [];
  rules: any;
  varData: any = [];
  tokenName : string  = "hris1Token";
  unsubscribe: any;
  constructor( 
    private cookies: CookiesService,  
  ) { 
    if (this.cookies.getCookie(this.tokenName) == null) { 
      console.log("tidak ada session login");
    } else {
      this.varToken = this.cookies.getCookie(this.tokenName); 
    } 
  }
 
  logout() {
    document.cookie = this.tokenName+"=null; expires = Thu, 01 Jan 1970 00:00:00 GMT;path=/"; 
  }

  setToken(token: string){
    this.cookies.setCookie(this.tokenName, token, 30); 
  }

  getToken() {
    return  this.cookies.getCookie(this.tokenName);
  }

 
  username() {
    return this.varData['name'];
  }

  headers() { 
    return this.varHeaders = new HttpHeaders({
      'Content-Type': 'application/json', 
      'Token': this.varToken,
    });
  } 
  token() {
    return this.varToken;
  }

  id_user() {
    return this.varToken;
  }


  errorToken(data: { [x: string]: number; }) {
    if (data['error'] == 400) {
      //  window.location.href = "login";
    }

  }
 

  extenCookies() { 
    var d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 90000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = this.tokenName + "=" + this.cookies.getCookie(this.tokenName) + ";" + expires + ";path=/";  
  }
 

 
 
}

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
  secretKeyAccess : string = "QkSDhtCFJQ4n75Xq8Cmy4WExRU3C4r"; 
 

  varToken: string = "";
  varHeaders: any = [];
  rules: any;
  varData: any = [];
  tokenName : string  = "cso1AdminToken";
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
    return this.cookies.getCookie(this.tokenName);
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

  secretKeyAccessGet(){
    return this.secretKeyAccess;
  }; 


  extenCookies() { 
    var d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 90000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = this.tokenName + "=" + this.cookies.getCookie(this.tokenName) + ";" + expires + ";path=/";  
  }

  accessRightPush(data:string){
    localStorage.setItem("SCO1Access", btoa(data));  
  }

  accessRightGet(){ 
   
    const obj = atob(localStorage.getItem("SCO1Access")|| ''); 

    if(!obj) {
      console.log("emtpy access right, please relogin!");
      this.logout();
    }else{
      return JSON.parse(obj);
    }
   
  }

  _access(){ 
    // let next : any =  ActivatedRoute;
    // let index = this.accessRightGet().findIndex(((obj: { module: any; }) => obj.module == next.data['active'] ));
    // if( this.accessRightGet()[index]['_access'] == 1){
    //   return true;
    // }else{
    //   return false;
    // }  
  }
  _modify(data:any){
     if(data.length > 0){ 
      let index = this.accessRightGet().findIndex(((obj: { module: any; }) => obj.module == data['active'] ));
      if( this.accessRightGet()[index]['_modify'] == 1){
        return true;
      }else{
         return false;
      }   
     }else{
      return false; 
     }
     
  }
 
}

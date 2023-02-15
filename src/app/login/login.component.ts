import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

export class Login {
  constructor(
    public email: string,
    public passw: string,
  ) { }

}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = new Login('', '');
  loading: boolean = false;
  api: string = environment.api;

  note: string = "";
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router,
  ) { }


  ngOnInit(): void {
    if(this.configService.getToken()){
      this.router.navigate(['home']);
    } 
  }

  onSubmit() {
    this.loading = true;
    this.note = "Loading..!";
    const hash = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(this.model['passw']));
    const md5 = hash.toString(CryptoJS.enc.Hex);

    this.model['passw'] = md5;
    console.log(this.model);

    this.http.post<any>(this.api + 'login/index/', this.model).subscribe(
      data => {
        this.loading = false;
        console.log(data);
        if (data['error'] !== true) {
          this.configService.setToken(data['data']['token']);
          window.location.reload();
          this.note = "Login Success ";
          this.router.navigate(['employee']);
        } else {
          this.note = "Login fail!";
        }
      },
      e => {
        console.log(e);
        this.note = "Error Server!";
      },
    );


  }
}

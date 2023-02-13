import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  active: string = "";
  module: any;
  ver : string = environment.ver;
  user : any  = {
    id : 0,
    name : 'loading...',
    email : 'loading...'
  };
  nav: any = {
    _masterData: 0,
    _timeManagement: 0,
    _reimbursement: 0,
    _loan: 0,
    _payroll: 0,
    _home: 1,
    _maintenance : 0,
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.active = this.activatedRoute.snapshot.data['active'];
    this.httpGet();
  }

  httpGet() {
    this.http.get(environment.api + "header/index", {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        const someObj : any =data;
        this.module = data;
        this.user = someObj['user'];
        
        if(someObj['error'] == 400){
          this.logout();
        }
        this.nav._masterData = this.module['module']['_masterData'];
        this.nav._loan = this.module['module']['_loan'];
        this.nav._payroll = this.module['module']['_payroll'];
        this.nav._reimbursement = this.module['module']['_reimbursement'];
        this.nav._timeManagement = this.module['module']['_timeManagement'];
        this.nav._maintenance = this.module['module']['_maintenance'];

        if (parseInt(this.module['module'][this.active]) != 1 && this.active != '_home') {
          this.router.navigate(['forbiden']);
        }
      },
      e => {
        console.log(e);
        //  this.router.navigate(['forbiden']);
      }
    )
  }

  logout() {
    const body = {
      token: this.configService.getToken(),
    }
    this.http.post<any>(environment.api + "login/signout", body,{
      headers : this.configService.headers(),
    }).subscribe(
      
      data=>{ 
       this.configService.logout();
        location.reload();
      }
    );
   
  }

}

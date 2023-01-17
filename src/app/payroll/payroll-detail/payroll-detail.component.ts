import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';

export class Model {

  constructor(
    public salary: string,
    public salaryType: string,
    public bankName: string,
    public bankAccountNumber: string,
    public bankAccountHolderName: string,
    public hourlyRate: any,
    public tunjangan: string,  
  ) { }

}
@Component({
  selector: 'app-payroll-detail',
  templateUrl: './payroll-detail.component.html',
  styleUrls: ['./payroll-detail.component.css']
})
export class PayrollDetailComponent implements OnInit {
  model: any = new Model("", "", "", "", "", "", "",);
  readonly: boolean = true;
  item: any = [];
  personal_religion: any = [];
  personal_marital: any = [];
  employmentId : string = "";
  payrollId : string = "";
  loading : boolean= false;
  id : string = "";
  constructor(
    private router: Router,
    private http: HttpClient,
    private configService: ConfigService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.httpGet();
  }

  httpGet() {
    this.loading = true;
    this.http.get<any>(environment.api + "payroll/detail/" + this.activatedRoute.snapshot.params['id'], {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        this.loading = false;  
        console.log(data); 
        this.item = data['item'][0];
        let expDate = data['item'][0]['taxableDate'].split("-"); 

        console.log(data); 

        /*
        public salary: string,
        public salaryType: string,
        public bankName: string,
        public bankAccountNumber: string,
        public bankAccountHolderName: string,
        public hourlyRate: any,
        public tunjangan: string,  */

        this.model['salary'] = data['item'][0]['salary'];  
        this.model['salaryType'] = data['item'][0]['salaryType'];  
        this.model['bankName'] = data['item'][0]['bankName'];  
        this.model['bankAccountNumber'] = data['item'][0]['bankAccountNumber'];  
        this.model['bankAccountHolderName'] = data['item'][0]['bankAccountHolderName'];  
        this.model['hourlyRate'] = data['item'][0]['hourlyRate'];  
        this.model['tunjangan'] = data['item'][0]['tunjangan'];   


        this.model['taxableDate'] = {
          year: parseInt(expDate['0']),
          month: parseInt(expDate['1']),
          day: parseInt(expDate['2']),
        }; 

        this.readonly = true;
      },
      e => {
        console.log(e);
      }
    )
  }

 

  fnSave() {
    const body = {
      id: this.activatedRoute.snapshot.params['id'],
      model: this.model,
    };
    this.http.post<any>(environment.api + "payroll/fnSave", body, {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        console.log(data);
        this.readonly = true;
      },
      e => {
        console.log(e);
      }
    )

  }

  back() {
    history.back();
  }

   


}

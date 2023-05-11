import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  pph21_ptkp : any = [];
  loading : boolean= false;
  id : string = "";
  bpjs : any = [];
  salaryTunjangan : any = [];
  constructor(
    private router: Router,
    private http: HttpClient,
    private configService: ConfigService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal
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
        
        console.log(data);  
        let item = data['item'][0];
        this.salaryTunjangan = data['tunjangan'];
        this.pph21_ptkp = data['pph21_ptkp'];
        this.model['salary'] = item['salary'];  
        this.model['salaryType'] = item['salaryType'];  
        this.model['bankName'] = item['bankName'];  
        this.model['bankAccountNumber'] = item['bankAccountNumber'];  
        this.model['bankAccountHolderName'] = item['bankAccountHolderName'];  
        this.model['hourlyRate'] = item['hourlyRate'];  
        this.model['tunjangan'] = item['tunjangan'];   

        this.model['taxNpwp'] = item['taxNpwp'];   
        this.model['taxMethod'] = item['taxMethod'];    
        this.model['taxHolderName'] = item['taxHolderName'];   
        this.model['taxPtkpStatus'] = item['taxPtkpStatus'];   
        this.model['taxSalary'] = item['taxSalary'];   
        this.model['EmploymentTaxStatus'] = item['EmploymentTaxStatus'];   
        this.model['taxPktpAccountHolder'] = item['taxPktpAccountHolder'];   
        this.model['bpsjTkNo'] = item['bpsjTkNo'];   
        this.model['bpsjKesehatanNo'] = item['bpsjKesehatanNo'];   
        this.model['JhtCost'] = item['JhtCost'];   
        this.model['JaminanPensiunCost'] = item['JaminanPensiunCost'];   
        this.model['bpjsKesehatanFamily'] = item['bpjsKesehatanFamily'];   
 
        let bpjsTkDate = item['bpjsTkDate'].split("-"); 
        this.model['bpjsTkDate'] = {
          year: parseInt(bpjsTkDate['0']),
          month: parseInt(bpjsTkDate['1']),
          day: parseInt(bpjsTkDate['2']),
        }; 
 
        let JaminanPensiunDate = item['JaminanPensiunDate'].split("-"); 
        this.model['JaminanPensiunDate'] = {
          year: parseInt(JaminanPensiunDate['0']),
          month: parseInt(JaminanPensiunDate['1']),
          day: parseInt(JaminanPensiunDate['2']),
        }; 

        let taxableDate = item['taxableDate'].split("-"); 
        this.model['taxableDate'] = {
          year: parseInt(taxableDate['0']),
          month: parseInt(taxableDate['1']),
          day: parseInt(taxableDate['2']),
        }; 

        this.bpjs = data['bpjs'];
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
      salaryTunjangan :this.salaryTunjangan,
    };
    console.log(body);
    this.http.post<any>(environment.api + "payroll/fnSave", body, {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        console.log(data);
        this.modalService.dismissAll();
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

  fnDeleteTunjangan(id:string){
    const body = {
      id: id, 
    };
    console.log(body);
    this.http.post<any>(environment.api + "payroll/fnDeleteTunjangan", body, {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        console.log(data); 
        this.httpGet();
      },
      e => {
        console.log(e);
      }
    )
  }
   
  open(content:any) {
		this.modalService.open(content);
	}

  fnTunjanganSave(){
    this.modalService.dismissAll();
  }
}

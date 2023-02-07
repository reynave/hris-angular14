import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';

export class Model {

  constructor(
    public personalId: string,
    public amount: string,
    public installment: number,
    public description: string, 
    public effectiveDate: any,

  ) { }

}

@Component({
  selector: 'app-loan-detail',
  templateUrl: './loan-detail.component.html',
  styleUrls: ['./loan-detail.component.css']
})
export class LoanDetailComponent implements OnInit {
  loading: boolean = false;
  id : string = ""; 
  selectPersonal : any = [];
  today : any = new Date();
  model: any = new Model("", "", 0, "",  "" );
  loanDetail : any = [];
  constructor(  
    private router: Router,
    private http: HttpClient,
    private configService: ConfigService,
    private activatedRoute :ActivatedRoute

  ) { 
  }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id']; 
    this.httpGet();
  }
  httpGet() {
    this.loading = true;
    this.http.get<any>(environment.api + "loan/loanDetail/"+this.id, { headers: this.configService.headers() })
    .subscribe(
      data=>{
        this.loading = false;
        this.selectPersonal = data['selectPersonal'];
        console.log(data);
        this.model['personalId'] =  data['data'][0]['personalId'];
        this.model['amount'] = data['data'][0]['amount'];
        this.model['installment'] = data['data'][0]['installment'];
        this.model['description'] = data['data'][0]['description'];
        this.model['effectiveDate'] = data['data'][0]['effectiveDate']; 
        this.loanDetail = data['loanDetail'];
      },
      e=>{
        console.log(e);
      }
    )
  }
  
  back() {
    history.back();
  }
   
}

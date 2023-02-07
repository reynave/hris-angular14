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
  selector: 'app-loan-approve-line',
  templateUrl: './loan-approve-line.component.html',
  styleUrls: ['./loan-approve-line.component.css']
})
export class LoanApproveLineComponent implements OnInit {
  loading: boolean = false;
  id : string = ""; 
  selectPersonal : any = [];
  today : any = new Date();
  model: any = new Model("", "", 12, "",  { "year": this.today.getFullYear(), "month": this.today.getMonth()+1, "day": this.today.getDate() });
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
    this.http.get<any>(environment.api + "loan/detailApproveLine/"+this.id, { headers: this.configService.headers() })
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
        let effectiveDate = data['data'][0]['effectiveDate'].split("-");

        this.model['effectiveDate'] = {
          year: parseInt(effectiveDate['0']),
          month: parseInt(effectiveDate['1']),
          day: parseInt(effectiveDate['2']),
        };
      },
      e=>{
        console.log(e);
      }
    )
  }
 
  onSubmit() {
    this.loading = true;
    const body = {
      item : this.model,
      id : this.id,
    }
    this.http.post<any>(environment.api + "loan/approved", body, {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        console.log(data);
         this.back();
      },
      e => {
        console.log(e);
      }
    )

  }
  back() {
    history.back();
  }
  remove(){
    if(confirm("Delete this ?") ){
      const body = {
        id : this.id,
      }
      this.http.post<any>(environment.api+"loan/remove",body,{
        headers : this.configService.headers()
      }).subscribe(
        data =>{
          if(data['error']== false){
            history.back();
          }
        },
        e=>{
          console.log(e);
        }
        
      )
    }
  }
}

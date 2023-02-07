import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
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
  selector: 'app-loan-add',
  templateUrl: './loan-add.component.html',
  styleUrls: ['./loan-add.component.css']
})
export class LoanAddComponent implements OnInit {
  loading: boolean = false;
  
  selectPersonal : any = [];
  today : any = new Date();
  model: any = new Model("", "", 12, "",  { "year": this.today.getFullYear(), "month": this.today.getMonth()+1, "day": this.today.getDate() });
  constructor(  
    private router: Router,
    private http: HttpClient,
    private configService: ConfigService,

  ) { 
  }
  ngOnInit(): void { 
    this.httpSelect();
  }
  httpSelect() {
    this.loading = true;
    this.http.get<any>(environment.api + "loan/select", { headers: this.configService.headers() })
    .subscribe(
      data=>{
        this.loading = false;
        console.log(data);
        this.selectPersonal = data['selectPersonal'];
      }
    )
  }
 
  onSubmit() {
    this.loading = true;
    const body = {
      item : this.model,
    }
    this.http.post<any>(environment.api + "loan/insert", body, {
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
}

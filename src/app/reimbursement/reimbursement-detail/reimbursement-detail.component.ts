import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';

export class Model {
  constructor(
    public reimbursementNameId: string,
    public description: string,
    public requestAmount: string,
    public requestDate: any,
    public paidAmount: string,
    public approvedBy: string,
    public approvedDate: string,
  ) { }
}

@Component({
  selector: 'app-reimbursement-detail',
  templateUrl: './reimbursement-detail.component.html',
  styleUrls: ['./reimbursement-detail.component.css']
})
export class ReimbursementDetailComponent implements OnInit {
  id: string = "";
  loading: boolean = false;
  model: any = new Model("", "", "", "","","",""); 
  reimbursementName: any = []; 
  item : any = [];
  approved : boolean = false;
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
    this.http.get<any>(environment.api + "reimbursement/detail/" + this.id, {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        console.log(data);
        this.item = data['item'];
        let requestDate = data['item']['requestDate'].split("-");

        this.reimbursementName = data['reimbursementName'];
        this.model['reimbursementNameId'] = data['item']['reimbursementNameId'];
        this.model['description'] = data['item']['description'];
        this.model['requestAmount'] = data['item']['requestAmount']; 
        this.model['paidAmount'] = data['item']['paidAmount']; 
        this.model['approvedBy'] = data['item']['approvedBy']; 
        this.model['approvedDate'] = data['item']['approvedDate']; 
        this.approved = this.model['approvedBy']  == "" ? false : true;
        this.model['requestDate'] = {
          year: parseInt(requestDate['0']),
          month: parseInt(requestDate['1']),
          day: parseInt(requestDate['2']),
        };
      });
  }

  back() {
    history.back();
  }
  copyAmount(){
    this.model.paidAmount = this.model.requestAmount;
  }
  onSubmit() {
    console.log("onSubmit");
    const body = {
      model: this.model,
      id : this.id,
      approved : this.approved
    }
    this.http.post<any>(environment.api + "reimbursement/update/", body, {
      headers: this.configService.headers(),
    }).subscribe(
      data => { 
        history.back();
      },
      e => {

      }
    )
  }

  remove(){
    if(confirm("Delete this ?") ){
      const body = {
        id : this.id,
      }
      this.http.post<any>(environment.api+"reimbursement/delete",body,{
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

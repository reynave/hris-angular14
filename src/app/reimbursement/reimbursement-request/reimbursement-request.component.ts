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
    public approved: string,
   
  ) { }
}

@Component({
  selector: 'app-reimbursement-request',
  templateUrl: './reimbursement-request.component.html',
  styleUrls: ['./reimbursement-request.component.css']
})
export class ReimbursementRequestComponent implements OnInit {

  id: string = "";
  loading: boolean = false;
  model: any = new Model("", "", "", "","","","",""); 
  reimbursementName: any = []; 
  item : any = [];
  approved : boolean = false;
  api : string = environment.api;
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
        this.model['approved'] = data['item']['approved'];  
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
    this.loading = true;
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
        this.loading = false;
        // if( this.approved == true){
        //   history.back();
        // }else{
        //   console.log(data);
        //   this.httpGet();
        // }
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

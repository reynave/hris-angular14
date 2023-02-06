import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';

export class Model {
  constructor(
    public personalId: string,
    public reimbursementNameId: string,
    public description: string,
    public requestAmount: string,
    public requestDate: any, 

  ) { }
}

@Component({
  selector: 'app-reimbursement-add',
  templateUrl: './reimbursement-add.component.html',
  styleUrls: ['./reimbursement-add.component.css']
})
export class ReimbursementAddComponent implements OnInit {
  id: string = "";
  loading: boolean = false;
  model: any = new Model("", "", "", "", "");
  personal: any = [];
  reimbursementName: any = []; 
  today : any = [];
  newData : any = [];
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
    this.http.get<any>(environment.api + "reimbursement/add/", {
      headers: this.configService.headers(),
    }).subscribe(
      data => {  
        this.loading = false;
        this.personal = data['personal'];
        this.reimbursementName = data['reimbursementName'];
        console.log(data);
        this.today = data['today'];
        this.model['requestDate'] = data['today'];

      });
  }

  back() {
    history.back();
  }

  onSubmit(){
    this.loading = true;
    const body = {
      item : this.model,
    }
    this.http.post<any>(environment.api+"reimbursement/insert/",body,{
      headers : this.configService.headers(),
    }).subscribe(
      data=>{
        this.loading = false;
        console.log(data);
        this.newData.push(data['insert'][0]);
        this.model = new Model("", "", "", "", ""); 
        this.model['requestDate'] = data['today'];

      },
      e=>{

      }
    )
  }
}

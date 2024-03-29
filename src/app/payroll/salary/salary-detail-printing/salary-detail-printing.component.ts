import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
@Component({
  selector: 'app-salary-detail-printing',
  templateUrl: './salary-detail-printing.component.html',
  styleUrls: ['./salary-detail-printing.component.css']
})
export class SalaryDetailPrintingComponent implements OnInit {
  item : any = [];
  items1 : any = [];
  items2 : any = [];
  items3 : any = [];
  salary_time : any = [];
  saving: boolean = false;
  id : string= "";
  isDraft : boolean = true;
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private http: HttpClient,
    private configService: ConfigService,
    private activeRouter: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.activeRouter.snapshot.params['id'];
    this.httpGet();
  }
  httpGet(){
    this.http.get<any>(environment.api+"salary/reports/"+this.id).subscribe(
      data=>{
        console.log(data);
       this.isDraft = data['item']['asLock'] == "1" ? false : true;
        this.saving = false;
        this.item = data['item'];
        this.items1 = data['items1'];
        this.items2 = data['items2'];
        this.items3 = data['items3'];
        this.salary_time = data['salary_time'];
        
       // console.log(data);
      }
    )
  }

  fnDelete(){
    if(confirm("Delete this draft?")){
      const body = {
        id  : this.id,
      }
      this.http.post<any>(environment.api+"salary/fnDelete/", body).subscribe(
        data=>{ 
          console.log(data);
          history.back();
        }
      )
    }
  }

  back(){
    history.back();
  }
  fnPrint(){
    print();
  }

  fnUpdate(){ 
    const body = {
      items1 : this.items1,
      items2 : this.items2,
      items3 : this.items3, 
      salaryId : this.id,
      personalId : this.item['personalId'], 
      salary_time : this.salary_time
    }
    this.saving = true;
    console.log(body);
    this.http.post<any>(environment.api+"salary/saleryDetailUpdate/", body).subscribe(
      data=>{
        this.httpGet();
        console.log(data);
      }
    )
  }

  fnCalculate(){ 
    const body = {
      items1 : this.items1,
      items2 : this.items2,
      items3 : this.items3, 
      salaryId : this.id,
      personalId : this.item['personalId'],
    }
    this.saving = true;
    this.http.post<any>(environment.api+"salary/fnCalculate/", body).subscribe(
      data=>{
        this.httpGet();
        console.log(data);
      }
    )
  }

}

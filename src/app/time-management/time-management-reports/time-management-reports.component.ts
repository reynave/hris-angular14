import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-time-management-reports',
  templateUrl: './time-management-reports.component.html',
  styleUrls: ['./time-management-reports.component.css']
})
export class TimeManagementReportsComponent implements OnInit {
  items: any = [];
  employee: any = [];
  summary: any = [];
  offtime : any = [];
  timeManagementShift: any = [];
  
  model : any = [];
  constructor(

    config: NgbModalConfig,
    private modalService: NgbModal,
    private router: Router,
    private http: HttpClient,
    private configService: ConfigService,
    private activeRouter: ActivatedRoute
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit(): void {
    this.httpGet();
  }

  httpGet() {
    let str = new URLSearchParams(this.activeRouter.snapshot.queryParams).toString();
    this.http.get<any>(environment.api + "timeManagement/reports?" + str,{
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        console.log(data);
        this.summary = data['summary'];
        this.employee = data['employee'];
        this.items = data['items'];
        this.timeManagementShift = data['timeManagementShift'];
      }
    )
  }
  back() {
    history.back();
  }
  printing() {
    print();
  }

  open(content: any, x:any) {
    this.model = x;
    this.modalService.open(content, { size: 'md' });
  }

  fnUpdate(){
    const body = {
      item : this.model,
      id : this.model['id']
    }
    this.http.post<any>(environment.api+"timeManagement/fnUpdate", body, {
      headers : this.configService.headers(),
    }).subscribe(
      data=>{
        this.modalService.dismissAll();
        console.log(data);
        this.httpGet();
      }
    )
  }
}

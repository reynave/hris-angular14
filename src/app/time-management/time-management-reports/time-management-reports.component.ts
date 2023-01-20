import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-time-management-reports',
  templateUrl: './time-management-reports.component.html',
  styleUrls: ['./time-management-reports.component.css']
})
export class TimeManagementReportsComponent implements OnInit {
  items : any = [];
  employee : any = [];
  summary : any = [];
  constructor(  
    private router: Router,
    private http: HttpClient,
    private configService: ConfigService,
    private activeRouter : ActivatedRoute 
  ) { 
  }
  ngOnInit(): void {
     this.httpGet();
  }

  httpGet(){
    let str = new URLSearchParams(this.activeRouter.snapshot.queryParams).toString(); 
    this.http.get<any>(environment.api+"timeManagement/reports?"+str).subscribe(
      data=>{
        console.log(data);
        this.summary = data['summary'];
        this.employee = data['employee'];
        this.items = data['items'];
      }
    )
  }
  back(){
    history.back();
  }
  printing(){
    print();
  }
}

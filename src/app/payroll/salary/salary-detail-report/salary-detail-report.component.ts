import { Component, OnInit } from '@angular/core'; 
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-salary-detail-report',
  templateUrl: './salary-detail-report.component.html',
  styleUrls: ['./salary-detail-report.component.css']
})
export class SalaryDetailReportComponent implements OnInit {
  item : any = [];
  id : string= "";
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
        this.item = data['item'];
        console.log(data);
      }
    )
  }
  back(){
    history.back();
  }
  fnPrint(){
    print();
  }
}

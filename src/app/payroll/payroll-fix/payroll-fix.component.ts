import { Component, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
@Component({
  selector: 'app-payroll-fix',
  templateUrl: './payroll-fix.component.html',
  styleUrls: ['./payroll-fix.component.css']
})
export class PayrollFixComponent implements OnInit {
  dtOptions: ADTSettings = {};
  thead: any = [];
  items: any = [];
  branchId :  string = '';
  startDate :  string = '';
  endDate :  string = '';
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private router: Router,
    private http: HttpClient,
    private configService: ConfigService,
    private activeRouter : ActivatedRoute

  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit(): void {
    this.branchId = this.activeRouter.snapshot.queryParams['branchId'],
    this.startDate = this.activeRouter.snapshot.queryParams['startDate'],
    this.endDate = this.activeRouter.snapshot.queryParams['endDate'], 
    this.httpGet(); 
  }

  httpGet() {
    this.http.get<any>(environment.api + "salaryFix/report",{
      headers: this.configService.headers(),
      params : {
        branchId : this.activeRouter.snapshot.queryParams['branchId'],
        startDate : this.activeRouter.snapshot.queryParams['startDate'],
        endDate : this.activeRouter.snapshot.queryParams['endDate'], 
      }
    }).subscribe(
      data => {
        console.log(data); 
        this.items = data['items']; 
      }
    )
  }
  back() {
    history.back();
  }
  

  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }
 


}

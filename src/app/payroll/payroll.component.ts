import { Component, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent implements OnInit {
  dtOptions: ADTSettings = {};
  thead: any = [];
  items: any = [];
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private router: Router,
    private http: HttpClient,
    private configService: ConfigService,

  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit(): void {
    this.httpGet(); 
  }

  httpGet() {
    this.http.get<any>(environment.api + "pph21/employee").subscribe(
      data => {
        console.log(data);
        this.thead = data['thead'];
        this.items = data['data'];

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

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

    this.dtOptions = {
      ajax: environment.api + 'payroll',
      columns: [
        {
          title: 'Employed ID',
          data: 'personalId',
        },
        {
          title: 'Name',
          data: 'personal',
        },
        {
          title: 'salaryType',
          data: 'salaryType',
        },

        {
          title: 'salary',
          data: 'salary',
        },
        {
          title: 'bankName',
          data: 'bankName',
        },
        {
          title: 'taxNpwp',
          data: 'taxNpwp',
        },

        {
          title: 'Detail',
          data: 'id',
          render: function (data: any, type: any, full: any) {
            return '<a class="btn btn-sm btn-primary" href="#/payroll/detail/' + data + '">Detail</a>';
          }
        },
      ]
    };
  }

  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }


}

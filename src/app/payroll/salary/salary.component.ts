import { Component, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
 
@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit {
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
      //  ajax: environment.api + 'employee',
      ajax: {
        url: environment.api + 'employee',
        type: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Token': this.configService.varToken,
        },
      },
      columns: [
        {
          title: 'Employed ID',
          data: 'id',
         
        },
        {
          title: 'Name',
          data: 'name',
        },
        {
          title: 'Branch',
          data: 'branch',
        },
        {
          title: 'Organization',
          data: 'organization',
        },
        {
          title: 'Position',
          data: 'jobPosition',
        },
        {
          title: 'Level',
          data: 'jobLevel',
        },

        {
          title: 'Status',
          data: 'empyStatus',
        },
        {
          title: 'Detail',
          data: 'id',
          searchable: false,
          orderable: false,
          render: function (data: any, type: any, full: any) {
            return '<a  href="#/payroll/salary/detail/' + data + '" class="btn btn-sm btn-primary py-0">Detail</a>';
          }
        },

      ]
    };
  }

 
 

}

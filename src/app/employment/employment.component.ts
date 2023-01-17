import { Component, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service'; 

@Component({
  selector: 'app-employment',
  templateUrl: './employment.component.html',
  styleUrls: ['./employment.component.css']
})
export class EmploymentComponent implements OnInit {
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
    console.log(environment.api + 'employment');
    this.dtOptions = {
      ajax: environment.api + 'employment',
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
          title: 'Position',
          data: 'jobPosition',
        },
        {
          title: 'Level',
          data: 'jobLevel',
        },
        // {
        //   title: 'Branch',
        //   data: 'branchId',
        // },
         {
          title: 'Approval Line',
          data: 'approvedLine',
        },
        {
          title: 'Organization',
          data: 'organization',
        },
        {
          title: 'Status',
          data: 'empyStatus',
        },
        {
          title: 'Join',
          data: 'dateJoinStart',
        },
        {
          title: 'End',
          data: 'dateJoinEnd',
        },
        {
          title: 'Detail',
          data: 'id',
          render: function (data: any, type: any, full: any) {
            return '<a class="btn btn-sm btn-primary" href="#/employment/detail/' + data + '">Detail</a>';
          }
        },
      ]
    };
  }
 
  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

}

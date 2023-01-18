import { Component, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service'; 

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
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
      ajax: environment.api + 'employee',
      columns: [
        {
          title: 'Employed ID',
          data: 'personalId',
          render: function (data: any, type: any, full: any) {
            return '<a  href="#/employment/detail/' + data + '">'+data+'</a>';
          }
        },
        {
          title: 'Name',
          data: 'personal',
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
          title: 'Join',
          data: 'dateJoinStart',
        },
        {
          title: 'End',
          data: 'dateJoinEnd',
        },
        
      ]
    };
  }
 
  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

}

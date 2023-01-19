import { Component, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service'; 

@Component({
  selector: 'app-time-management',
  templateUrl: './time-management.component.html',
  styleUrls: ['./time-management.component.css']
})
export class TimeManagementComponent implements OnInit {
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
      ajax: environment.api + 'timeManagement', 
    
  
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
          title: 'Date',
          data: 'date',
        },
        {
          title: 'Shift',
          data: 'shift',
        },
        {
          title: 'Schedule In',
          data: 'scheduleIn',
          render: function (data: any, type: any, full: any) {
            return  data != null ? data.slice(0, -3) : "";
          }
        },
        {
          title: 'Schedule Out',
          data: 'scheduleOut',
          render: function (data: any, type: any, full: any) {
            return  data != null ? data.slice(0, -3) : "";
          }
        },
        {
          title: 'Check In',
          data: 'checkIn',
          render: function (data: any, type: any, full: any) {
            return  data != null ? data.slice(0, -3) : "";
          }
        },
        {
          title: 'Check Out',
          data: 'checkOut',
          render: function (data: any, type: any, full: any) {
            return  data != null ? data.slice(0, -3) : "";
          }
        },
        {
          title: 'Over Time',
          data: 'overTime',  
          render: function (data: any, type: any, full: any) {
            return  data != null ? data.slice(0, -3) : "";
          }
        },
        {
          title: '',
          data: 'id',
          searchable : false,
          orderable : false,
          render: function (data: any, type: any, full: any) {
            return '<a class="btn btn-sm btn-danger" href="#/timeManagement/edit/' + data + '">Edit</a>';
          }
        },
        
       
      ]
    };
  }
 
  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

}

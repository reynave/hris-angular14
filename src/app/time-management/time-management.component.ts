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
  styleBtn: string = "btn btn-sm btn-outline-dark mx-1";
  dtOptions: ADTSettings = {};
  date: any = new Date();
  personalId: string = "";
  today: any = {
    year: parseInt(this.date.getFullYear()),
    month: parseInt(this.date.getMonth()) + 1,
    day: parseInt(this.date.getDate()),
  }

  startDate: any = {
    year: parseInt((this.date).getFullYear()),
    month: parseInt(this.date.getMonth()) + 1,
    day: 1,
  };
  endDate: any = this.today;
  personalSelect: any = [];
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
            return data != null ? data.slice(0, -3) : "";
          }
        },
        {
          title: 'Schedule Out',
          data: 'scheduleOut',
          render: function (data: any, type: any, full: any) {
            return data != null ? data.slice(0, -3) : "";
          }
        },
        {
          title: 'Check In',
          data: 'checkIn',
          render: function (data: any, type: any, full: any) {
            return data != null ? data.slice(0, -3) : "";
          }
        },
        {
          title: 'Check Out',
          data: 'checkOut',
          render: function (data: any, type: any, full: any) {
            return data != null ? data.slice(0, -3) : "";
          }
        },
        {
          title: 'Over Time',
          data: 'overTime',
          render: function (data: any, type: any, full: any) {
            return data != null ? data.slice(0, -3) : "";
          }
        },
        {
          title: '',
          data: 'id',
          searchable: false,
          orderable: false,
          render: function (data: any, type: any, full: any) {
            return '<a class="btn btn-sm btn-danger" href="#/timeManagement/edit/' + data + '">Edit</a>';
          }
        },


      ]
    };

    this.http.get<any>(environment.api + "timeManagement/employee", {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        this.personalSelect = data['data'];
      }
    )

  }

  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  fnNext() {
    let queryParams = {
      id: this.personalId,
      startDate: this.startDate['year'] + "-" + ('0'+this.startDate['month']).slice(-2)  + "-"+('0'+this.startDate['day']).slice(-2) ,
      endDate: this.endDate['year'] + "-" + ('0'+this.endDate['month']).slice(-2)  + "-"+('0'+this.endDate['day']).slice(-2) ,
    }
    console.log(queryParams);
    this.router.navigate(['timeManagement/reports'],
      { queryParams: queryParams }
    ).then(
      () => { 
        this.modalService.dismissAll();
      }
    )
  }
}

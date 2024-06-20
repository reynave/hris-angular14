import { Component, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';

export class Model {

  constructor(
    public name: string,
    public phone: string,
    public email: string,
    public gender: string,
    public birthPlace: string,
    public birthDate: any,

  ) { }

}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  dtOptions: ADTSettings = {};
  dtOptions2: ADTSettings = {};
  
  model: any = new Model("", "", "", "", "", { "year": 1990, "month": 1, "day": 1 });
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
    this.dtOptions2 = {
      //  ajax: environment.api + 'employee',
      ajax: {
        url: environment.api + 'employee/reminderExp',
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
          render: function (data: any, type: any, full: any) {
            return '<a  href="#/employee/detail/' + data + '?tab=">' + data + '</a>';
          }
        },
        {
          title: 'Name',
          data: 'name',
        },
       
        {
          title: 'Status',
          data: 'employmentStatus',
        },
       
        {
          title: 'Join Start',
          data: 'dateJoinStart',
        },
        {
          title: 'Join End',
          data: 'dateJoinEnd',
        },
        {
          title: 'Expired until (day)',
          data: 'expDate',
        },

      ]
    };
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
          render: function (data: any, type: any, full: any) {
            return '<a  href="#/employee/detail/' + data + '?tab=">' + data + '</a>';
          }
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
          title: 'Sisa Cuti',
          data: 'sisaCuti',
        },

      ]
    };
  }

  onSubmit() {
    const body = this.model;
    this.http.post<any>(environment.api + "personal/insert", body, {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['employee/detail/', data['id']]).then(
          () => {
            this.modalService.dismissAll();
          }
        )
      },
      e => {
        console.log(e);
      }
    )

  }
  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }
}

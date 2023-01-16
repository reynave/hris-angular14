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
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  dtOptions: ADTSettings = {};
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
    this.dtOptions = {
      ajax: environment.api + 'personal',
      columns: [
        {
          title: 'Employed ID',
          data: 'id',
        },
        {
          title: 'Full Name',
          data: 'name',
        },
        {
          title: 'Email',
          data: 'email',
        },
        {
          title: 'ID Number',
          data: 'idNumber',
        },
        {
          title: 'Gender',
          data: 'gender',
          render: function (data: any, type: any, full: any) {
            return data == '1' ? 'Male' : 'Femela';
          }
        },
        {
          title: 'Birth Date',
          data: 'birthDate',
        },
        {
          title: 'Create date',
          data: 'inputDate',  
        },
        {
          title: 'Detail',
          data: 'id',
          render: function (data: any, type: any, full: any) {
            return '<a class="btn btn-sm btn-primary" href="#/personal/detail/' + data + '">Detail</a>';
          }
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
        this.router.navigate(['personal/detail/',data['id']]).then(
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

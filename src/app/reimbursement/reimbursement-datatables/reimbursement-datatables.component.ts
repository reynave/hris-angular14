import { Component, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap'; 
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service'; 
@Component({
  selector: 'app-reimbursement-datatables',
  templateUrl: './reimbursement-datatables.component.html',
  styleUrls: ['./reimbursement-datatables.component.css']
})
export class ReimbursementDatatablesComponent implements OnInit {
 
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
   console.log("httpGet");
    this.dtOptions = { 
      ajax: {
        url: environment.api + 'reimbursement',
        type: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Token': this.configService.varToken,
        },
      },
      columns: [
        {
          title: 'Transaction ID',
          data: 'id',
        
        },
        {
          title: 'Employed ID',
          data: 'personalId',
          render: function (data: any, type: any, full: any) {
            return '<a  href="#/employment/detail/' + data + '">'+data+" "+full['name']+'</a>';
          }
        }, 
        {
          title: 'Request Date',
          data: 'requestDate',
        
        },
        {
          title: 'Reimbursement',
          data: 'reimbursement',
        }, 
       
        {
          title: 'Description',
          data: 'description',
        },
        {
          title: 'Request Amount',
          data: 'price', 
          render: function (data: any, type: any, full: any) { 
            return `<div class="text-end">${data}</div>`;
          }
        },
      
        
        {
          title: '',
          data: 'id',
          searchable : false,
          orderable : false,
          render: function (data: any, type: any, full: any) {
            return `<a href="#/reimbursement/detail/${data}"><img src="./assets/img/icons8-edit-48.png" height="20"></a>`;
          }
        }, 
      ]
    };
  }
 
  
 

}

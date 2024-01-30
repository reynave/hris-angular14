import { Component, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dtOptionsReimbursement: ADTSettings = {};
  dtOptionsLoan: ADTSettings = {};


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
    this.dtOptionsReimbursement = {
      ajax: {
        url: environment.api + 'reimbursement',
        type: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Token': this.configService.varToken,
        },
        // success: function(data) { 
        //   console.log(data); 
        //  }
      },
      columns: [
        {
          title: 'Ticket ID',
          data: 'id',

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
          searchable: false,
          orderable: false,
          render: function (data: any, type: any, full: any) {
            return `<a href="#/home/reimbursement/detail/${data}"><img src="./assets/img/icons8-edit-48.png" height="20"></a>`;
          }
        },
      ]
    };

    this.dtOptionsLoan = {
      ajax: {
        url: environment.api + 'loan',
        type: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Token': this.configService.varToken,
        },
        // success: function (data) {
        //   console.log(data);
        // }
      },
      columns: [
        {
          title: 'Ticket ID',
          data: 'id',

        },
        {
          title: 'Request Amount',
          data: 'amount', 
        },
        {
          title: 'Description',
          data: 'description', 
        },
        {
          title: 'Request Effective Date',
          data: 'effectiveDate', 
        },
        {
          title: 'Installment',
          data: 'installment', 
        },
        {
          title: '',
          data: 'id',
          searchable: false,
          orderable: false,
          render: function (data: any, type: any, full: any) {
            return `<a href="#/home/loan/detail/${data}"><img src="./assets/img/icons8-edit-48.png" height="20"></a>`;
          }
        },
        
      ]
    };
  }


  getHistoryPresence(){
    const params = {
      id :123,
    };
    this.router.navigate(['timeManagement/reports'],{queryParams:params});
  }



}

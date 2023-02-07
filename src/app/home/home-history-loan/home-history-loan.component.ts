import { Component, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
@Component({
  selector: 'app-home-history-loan',
  templateUrl: './home-history-loan.component.html',
  styleUrls: ['./home-history-loan.component.css']
})
export class HomeHistoryLoanComponent implements OnInit {
 
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
    this.dtOptionsLoan = {
      ajax: {
        url: environment.api + 'loan/history',
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
          title: 'Approved Amount',
          data: 'amount', 
        },
        {
          title: 'Description',
          data: 'description', 
        },
        {
          title: 'Effective Date',
          data: 'effectiveDate', 
        },
        {
          title: 'Installment',
          data: 'installment', 
          render: function (data: any, type: any, full: any) { 
            return full['paidInstallment']+"/"+data;
          }
        },

        {
          title: 'Detail',
          data: 'id',
          searchable: false,
          orderable: false,
          render: function (data: any, type: any, full: any) { 
            return `<a href="#/home/loan/history/log/${data}">Detail</a>`;
       
          }
        },
        
      ]
    };
  }

   

}

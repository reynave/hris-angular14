import { Component, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings'; 
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';


@Component({
  selector: 'app-loan-history',
  templateUrl: './loan-history.component.html',
  styleUrls: ['./loan-history.component.css']
})
export class LoanHistoryComponent implements OnInit {
  
  dtOptions: ADTSettings = {};
  selectPersonal: any = [];
  constructor(
    private configService: ConfigService,

  ) {
  }
  ngOnInit(): void {
    this.httpGet();
  }


  httpGet() {
    this.dtOptions = {
      ajax: {
        url: environment.api + 'loan/adminHistory',
        type: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Token': this.configService.varToken,
        },
      },
      columns: [
        {
          title: 'Ticket ID',
          data: 'id',
        },
        {
          title: 'Employee',
          data: 'id',
          render: function (data: any, type: any, full: any) {
            return full['id'] + " " + full['personal'];
          }
        },
        {
          title: 'Installment',
          data: 'installment',
        },
        {
          title: 'Request Date',
          data: 'effectiveDate',
        },
        {
          title: 'Amount',
          data: 'amount',
        },
        {
          title: 'Approved Line',
          data: 'approvalLineName',
          render: function (data: any, type: any, full: any) {
            return full['approvalLineId'] +' ' + data ;
          }
        },
        {
          title: 'Detail',
          data: 'id',
          render: function (data: any, type: any, full: any) {
            return '<a class="btn btn-sm btn-primary" href="#/loan/detail/' + data + '">Detail</a>';
          }
        },
      ]
    };
  }

}

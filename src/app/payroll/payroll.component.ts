import { Component, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent implements OnInit {
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

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'decimal', 
      // These options are needed to round to whole numbers if that's what you want.
      minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
    

    console.log(environment.api + 'pph21/employee/');
    this.dtOptions = {
      ajax: {
        url: environment.api + 'pph21/employee/',
        type: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Token': this.configService.varToken,
        },
      }, 
      scrollX: true,
      ordering: false,
      columnDefs: [
        { targets: [2,3,  5, 6, 7,8,9,10,11,12,13,14,15,16,17], className: 'dt-body-right', },
        { targets: [2,3,  5, 6, 7,8,9,10,11,12,13,14,15,16,17], className: 'dt-head-right', width: "100px" }
   
      ],
      columns: [
        {
          title: 'ID',
          data: 'id',
        },
        {
          title: 'Name',
          data: 'name',
        },
        {
          title: 'Salary',
          data: 'salary',
          render: function (data: any, type: any, full: any) {
            return formatter.format(data);
         }
        },
        {
          title: 'Tunjangan',
          data: 'tunjangan',
          render: function (data: any, type: any, full: any) {
            return formatter.format(data);
         }
        },
        {
          title: 'PTKP',
          data: 'taxPtkpStatus', 
        },
        {
          title: 'BPJS',
          data: 'bpjs',
          render: function (data: any, type: any, full: any) {
            return formatter.format(data);
         }
        },
        {
          title: 'JKK',
          data: 'jkk',
          render: function (data: any, type: any, full: any) {
            return formatter.format(data);
         }
        },
        {
          title: 'jkm',
          data: 'jkm',
          render: function (data: any, type: any, full: any) {
            return formatter.format(data);
         }
        },
        {
          title: 'BRUTO',
          data: 'bruto',
          render: function (data: any, type: any, full: any) {
            return formatter.format(data);
         }
        },
        {
          title: 'By Jabatan',
          data: 'byJabatan',
          render: function (data: any, type: any, full: any) {
            return formatter.format(data);
         }
        },
        {
          title: 'BPJS Kes',
          data: 'bpjsKes',
          render: function (data: any, type: any, full: any) {
            return formatter.format(data);
         }
        },
        {
          title: 'JHT',
          data: 'jht',
          render: function (data: any, type: any, full: any) {
            return formatter.format(data);
         }
        },
        {
          title: 'JP',
          data: 'jp',
          render: function (data: any, type: any, full: any) {
            return formatter.format(data);
         }
        },
        {
          title: 'NETTO',
          data: 'netto',
          render: function (data: any, type: any, full: any) {
            return formatter.format(data);
         }
        },
        {
          title: 'PTKP',
          data: 'ptkpAmount',
          render: function (data: any, type: any, full: any) {
            return formatter.format(data);
         }
        },
        {
          title: 'PKP',
          data: 'pkp',
          render: function (data: any, type: any, full: any) {
                return formatter.format(data);
             }
        },
        {
          title: 'Pph21 Terutang setahun',
          data: 'pph21Year',
          render: function (data: any, type: any, full: any) {
                return formatter.format(data);
             }
        },

        {
          title: 'Pph21 Terutang sebulan',
          data: 'pph21Month',
          render: function (data: any, type: any, full: any) {
                return formatter.format(data);
             }
        },
        // {
        //   title: 'Detail',
        //   data: 'id',
        //   render: function (data: any, type: any, full: any) {
        //     return '<a class="btn btn-sm btn-primary" href="#/payroll/detail/' + data + '">Detail</a>';
        //   }
        // },
      ]
    };
  }

  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }


}

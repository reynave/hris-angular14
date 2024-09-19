import { Component, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-sdf-detail',
  templateUrl: './sdf-detail.component.html',
  styleUrls: ['./sdf-detail.component.css']
})
export class SdfDetailComponent implements OnInit {
  dtOptions: ADTSettings = {};
  personalId: string = "";
  personalData: any = [];
  uploadId: string =''; 
  date: any = new Date(); 
  loading: boolean = false;
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private router: Router,
    private http: HttpClient,
    private configService: ConfigService,
    private activeRouter: ActivatedRoute,

  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit(): void {
    this.personalId = this.activeRouter.snapshot.params['id'];
    this.uploadId = this.activeRouter.snapshot.queryParams['uploadId']; 
    
    this.datatables();
    this.httpGet();

  }
  back() {
    history.back();
  }
  httpGet() {
    this.http.get<any>(environment.api + "salary/detail/" + this.personalId).subscribe(
      data => {
        console.log(data); 
        this.personalData = data['personalData'];
      }
    )
  }

  
  datatables() {
    let dollarUSLocale = Intl.NumberFormat('en-US');
    this.dtOptions = {
      ajax: {
        url: environment.api + 'SalaryFix/datatablesDetail/',
        type: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Token': this.configService.varToken,
        },
        data : {
          id : this.personalId,
          uploadId : this.activeRouter.snapshot.queryParams['uploadId'],  
          
        }
      },
      ordering: false,
      columnDefs: [ 
        { className: "dt-head-right", targets: [5,6,7,8,9,10] },
      ],
      columns: [
        {
          title: 'Branch ID',
          data: 'branchId',
        },
        {
          title: 'Start Date',
          data: 'startDate',
        },
        {
          title: 'End Date',
          data: 'endDate',
        },
        {
          title: 'Position',
          data: 'position',
        },
        {
          title: 'Qty',
          data: 'qty',
        },
        {
          title: 'Rate Per Hours',
          data: 'ratePerHours',
          render: function (data: any, type: any, full: any) {
            return '<div class="text-end">'+dollarUSLocale.format(data)+'</div>';
          }
        },
        {
          title: 'Total',
          data: 'total',
          render: function (data: any, type: any, full: any) {
            return '<div class="text-end">'+dollarUSLocale.format(data)+'</div>';
          }
        },
        {
          title: 'Tax',
          data: 'tax',
          render: function (data: any, type: any, full: any) {
            return '<div class="text-end">'+dollarUSLocale.format(data)+'</div>';
          }
        },
        {
          title: 'Loan',
          data: 'loan',
          render: function (data: any, type: any, full: any) {
            return '<div class="text-end">'+dollarUSLocale.format(data)+'</div>';
          }
        },
        {
          title: 'Loan',
          data: 'loan',
          render: function (data: any, type: any, full: any) {
            return '<div class="text-end">'+dollarUSLocale.format(data)+'</div>';
          }
        },

        {
          title: 'Grand Total',
          data: 'grandTotal',
          render: function (data: any, type: any, full: any) {
            return '<div class="text-end">'+dollarUSLocale.format(data)+'</div>';
          }
        },
      ]
    };
  }


}

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
  month: string = "";
  year: string = "";

  personalData: any = [];
  uploadId: string = '';
  items: any = [];
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
    this.month = this.activeRouter.snapshot.queryParams['month'];
    this.year = this.activeRouter.snapshot.queryParams['year'];

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
    this.http.get<any>(environment.api + 'SalaryFix/datatablesDetail/', {
      headers: this.configService.headers(),
      params: {
        id: this.personalId,
        month: this.activeRouter.snapshot.queryParams['month'],
        year: this.activeRouter.snapshot.queryParams['year'],
        branchId: this.activeRouter.snapshot.queryParams['branchId'],
      }
    }).subscribe(
      data => {
        console.log(data);
        this.items = data['data'];
      }
    )


    // let dollarUSLocale = Intl.NumberFormat('en-US');
    // this.dtOptions = {
    //   ajax: {
    //     url: environment.api + 'SalaryFix/datatablesDetail/',
    //     type: "GET",
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Token': this.configService.varToken,
    //     },
    //     data : {
    //       id : this.personalId, 
    //       month : this.activeRouter.snapshot.queryParams['month'],  
    //       year : this.activeRouter.snapshot.queryParams['year'],  
    //       branchId : this.activeRouter.snapshot.queryParams['branchId'],  

    //     }
    //   },
    //   ordering: false,
    //   columnDefs: [ 
    //  //   { className: "dt-head-right", targets: [5,6,7,8,9,10] },
    //   ],
    //   columns: [
    //     {
    //       title: 'No',
    //       data: 'id',
    //       render: function (data, type, row, meta) {
    //         return meta.row  + 1; 
    //       }
    //     },
    //     {
    //       title: 'Treatment Date',
    //       data: 'treatmentDate',
    //     },
    //     {
    //       title: 'Treatment Time',
    //       data: 'treatmentTime',
    //     },
    //     {
    //       title: 'Position',
    //       data: 'position',
    //     },

    //     {
    //       title: 'Rate Per Hours',
    //       data: 'ratePerHours',
    //       render: function (data: any, type: any, full: any) {
    //         return '<div class="text-end">'+dollarUSLocale.format(data)+'</div>';
    //       }
    //     },

    //     {
    //       title: 'BPJS',
    //       data: 'bpjs',
    //       render: function (data: any, type: any, full: any) {
    //         return '<div class="text-end">'+dollarUSLocale.format(data)+'</div>';
    //       }
    //     },
    //     {
    //       title: 'LOAN',
    //       data: 'loan',
    //       render: function (data: any, type: any, full: any) {
    //         return '<div class="text-end">'+dollarUSLocale.format(data)+'</div>';
    //       }
    //     },
    //     {
    //       title: 'TAX',
    //       data: 'tax',
    //       render: function (data: any, type: any, full: any) {
    //         return '<div class="text-end">'+dollarUSLocale.format(data)+'</div>';
    //       }
    //     },
    //     {
    //       title: 'Grand Total',
    //       data: 'grandTotal',
    //       render: function (data: any, type: any, full: any) {
    //         return '<div class="text-end">'+dollarUSLocale.format(data)+'</div>';
    //       }
    //     },
    //     {
    //       title: 'inputDate',
    //       data: 'inputDate',
    //     },
    //     {
    //       title: 'uploadId',
    //       data: 'uploadId',
    //     },
    //   ]
    // };
  }

  checkAll: number = 0;
  updateAll() {
    if (this.checkAll == 0) { this.checkAll = 1 }
    else {
      this.checkAll = 0
    }

    this.items.forEach((el: any) => {
      el['checkbox'] = this.checkAll;
    });

  }

  deleteAll() {
    const body = {
      items: this.items,
    }
    console.log(body);
    if (confirm("Delete check ?")) {


      this.http.post<any>(environment.api + 'SalaryFix/deleteAll/', body, {
        headers: this.configService.headers(),
      }).subscribe(
        data => {
          this.datatables();
        }
      )
    }
  }

  updateCheckbox(c: any, i: number) {

    if (c == 0) { c = 1 }
    else {
      c = 0
    }

    this.items[i]['checkbox'] = c;
  }
}

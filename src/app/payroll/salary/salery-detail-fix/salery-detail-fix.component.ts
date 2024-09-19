import { Component, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-salery-detail-fix',
  templateUrl: './salery-detail-fix.component.html',
  styleUrls: ['./salery-detail-fix.component.css']
})
export class SaleryDetailFixComponent implements OnInit {
  dtOptions: ADTSettings = {};
  personalId: string = "";
  personalData: any = [];
  dateStart: number = 1;
  dateEnd: number = 1;
  date: any = new Date();
  periodStartDate: any = { year: this.date.getFullYear(), month: this.date.getMonth(), day: this.dateStart }
  periodEndDate: any = { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.dateEnd }
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
        this.periodStartDate.day = data['periodStartDate'];
        this.periodEndDate.day = data['periodEndDate'];
        this.personalData = data['personalData'];
      }
    )
  }

  datatables() {
    let dollarUSLocale = Intl.NumberFormat('en-US');
    this.dtOptions = {
      ajax: {
        url: environment.api + 'SalaryFix/datatables/' + this.personalId,
        type: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Token': this.configService.varToken,
        },
      },
      // ordering: false,
      columnDefs: [
        { className: "dt-head-right", targets: [3] },
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
          title: 'Grand Total',
          data: 'grandTotal',
          orderable: false,
          render: function (data: any, type: any, full: any) {
            return '<div class="text-end">' + dollarUSLocale.format(data) + '</div>';
          }
        },
        {
          title: 'Upload ID',
          data: 'uploadId',
          orderable: false,
        },
        {
          title: 'Detail',
          data: 'personalId',
          searchable: false,
          orderable: false,
          render: function (data: any, type: any, full: any) {

            let params = "uploadId=" + full['uploadId'];
            return '<a  href="#/payroll/salary/detailFix/' + data + '/detail?' + params + '" class="btn btn-sm btn-primary py-0">Detail</a>';
          }
        },
      ]
    };
  }


}

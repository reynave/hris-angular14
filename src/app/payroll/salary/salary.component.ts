import { Component, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit {


  date = new Date();
  report: any = {
    branchId: '',
    startDate: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: 1 },
    endDate: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: 30 },

  }
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
    this.datatable();
    this.httpGet();

  }

  datatable() {

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
          title: 'Organization',
          data: 'organization',
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
          title: 'Detail',
          data: 'id',
          searchable: false,
          orderable: false,
          render: function (data: any, type: any, full: any) {
            //return '<a  href="#/payroll/salary/detail/' + data + '" class="btn btn-sm btn-primary py-0">Detail</a>';
            return '<a  href="#/payroll/salary/detailFix/' + data + '" class="btn btn-sm btn-primary py-0">Detail</a>';

          }
        },

      ]
    };
  }


  selectBranch: any = [];
  httpGet() {
    this.http.get<any>(environment.api + "SalaryFix/index", {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        console.log(data);
        this.selectBranch = data['selectBranch'];

      },
      error => {
        console.error(error);
      }
    )
  }

  open(content: any) {
    this.modalService.open(content);
  }

  goToReport() {
     

    let params = {
      startDate: this.report.startDate['year'] + "-" + this.report.startDate['month'].toString().padStart(2, '0') + "-" + this.report.startDate['day'].toString().padStart(2, '0'),
      endDate: this.report.endDate['year'] + "-" + this.report.endDate['month'].toString().padStart(2, '0') + "-" + this.report.endDate['day'].toString().padStart(2, '0'),
      branchId : this.report.branchId,
    }
    this.router.navigate(['payroll/fix'], {queryParams:params}).then(()=>{
      this.modalService.dismissAll();
    });
  }


}

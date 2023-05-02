import { Component, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-salary-detail',
  templateUrl: './salary-detail.component.html',
  styleUrls: ['./salary-detail.component.css']
})
export class SalaryDetailComponent implements OnInit {
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
        url: environment.api + 'salary/datatables/' + this.personalId,
        type: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Token': this.configService.varToken,
        },
      },
      ordering: false,
      columns: [
        {
          title: 'Period Start',
          data: 'periodStartDate',
        },
        {
          title: 'Period End',
          data: 'periodEndDate',
        },

        {
          title: 'Tunjangan Tetap',
          data: 'tunjanganTetap',
          render: function (data: any, type: any, full: any) {
           
            return '<div class="text-end">'+dollarUSLocale.format(data)+'</div>';
          }
        },

        {
          title: 'Tunjangan Tidak Tetap',
          data: 'tunjanganTidakTetap',
          render: function (data: any, type: any, full: any) {
            return '<div class="text-end">'+dollarUSLocale.format(data)+'</div>';
          }
        },

        {
          title: 'Potongan',
          data: 'potongan',
          render: function (data: any, type: any, full: any) {
            return '<div class="text-end">'+dollarUSLocale.format(data)+'</div>';
          }
        },
        {
          title: 'Take Home Pay',
          data: 'takeHomePay',
          render: function (data: any, type: any, full: any) {
            return '<div class="text-end">'+dollarUSLocale.format(data)+'</div>';
          }
        },
        {
          title: 'Status',
          data: 'asLock',
          render: function (data: any, type: any, full: any) {
            return data == 0 ? 'Draft' : 'Publish';
          }
        },

        {
          title: 'Detail',
          data: 'id',
          searchable: false,
          orderable: false,
          render: function (data: any, type: any, full: any) {
            return '<a  href="#/payroll/salary/detail/report/' + data + '" class="btn btn-sm btn-primary py-0">Detail</a>';
          }
        }, 
        
      ]
    };
  }
  

  fnGenerate() {
    this.loading = true;
    const body = {
      personalId: this.personalId,
      periodStartDate: this.periodStartDate,
      periodEndDate: this.periodEndDate,
    }
    console.log(body);
    console.log("Loading 1!");
    let startDate = body['periodStartDate']['year'] + "-" + body['periodStartDate']['month'] + "-" + body['periodStartDate']['day'];
    let endDate = body['periodEndDate']['year'] + "-" + body['periodEndDate']['month'] + "-" + body['periodEndDate']['day'];
    let url = environment.api + "timeManagement/reports/?id=" + this.personalId + "&startDate=" + startDate + "&endDate=" + endDate;

    console.log(url);
    this.http.get<any>(url, {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        console.log("Loading 2!");
        console.log(data);

        const master = {
          personalId: this.personalId,
          periodStartDate: this.periodStartDate,
          periodEndDate: this.periodEndDate,
          timeManagement: data['items']
        }

        this.http.post<any>(environment.api + "salary/fnGenerate", master).subscribe(
          data => {
            console.log(data);
            if (!data['error']) { 
              this.modalService.dismissAll();
              this.router.navigate(['payroll/salary/detail/report/', data['id']]);
            }
          }
        )


      }
    );
  }


  fnGenerateSAVE() {
    const body = {
      personalId: this.personalId,
      periodStartDate: this.periodStartDate,
      periodEndDate: this.periodEndDate,
    }
    this.http.post<any>(environment.api + "salary/fnGenerate", body).subscribe(
      data => {
        console.log("step 1");
        console.log(data);

        if (data['error'] == false) {
          let url = environment.api + "timeManagement/saveReport/?id=" + this.personalId + "&startDate=" + data['startDate'] + "&endDate=" + data['endDate'];
          this.http.get<any>(url).subscribe(
            data => {
              console.log("step 2");
              console.log(data);
              location.reload();
            }
          );
        }
      }
    )
  }

  open(content: any) {
    this.modalService.open(content);
  }
}

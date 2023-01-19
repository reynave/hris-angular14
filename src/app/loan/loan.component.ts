import { Component, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';

export class Model {

  constructor(
    public personalId: string,
    public amount: string,
    public installment: number,
    public description: string, 
    public effectiveDate: any,

  ) { }

}

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {
  dtOptions: ADTSettings = {};
  selectPersonal : any = [];
  today : any = new Date();
  model: any = new Model("", "", 12, "",  { "year": this.today.getFullYear(), "month": this.today.getMonth()+1, "day": this.today.getDate() });
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
    this.httpSelect();
  }
  httpSelect() {
    this.http.get<any>(environment.api + "loan/select", { headers: this.configService.headers() })
    .subscribe(
      data=>{
        console.log(data);
        this.selectPersonal = data['selectPersonal'];
      }
    )
  }

  httpGet() {
    this.dtOptions = {
      ajax: environment.api + 'loan',
      columns: [
        {
          title: 'Transaction ID',
          data: 'id',
        },
        {
          title: 'Employee',
          data: 'id',
          render: function (data: any, type: any, full: any) {
            return full['id'] +" "+full['personal'];
          }
        },
        {
          title: 'Installment',
          data: 'installment',
        },
        {
          title: 'Effective Date',
          data: 'effectiveDate',
        },
        {
          title: 'Amount',
          data: 'amount',
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
  onSubmit() {
    const body = {
      item : this.model,
    }
    this.http.post<any>(environment.api + "loan/insert", body, {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['loan/detail/', data['id']]).then(
          () => {
            this.modalService.dismissAll();
          }
        )
      },
      e => {
        console.log(e);
      }
    )

  }
  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }
}

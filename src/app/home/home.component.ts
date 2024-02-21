import { Component, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // chartJsBar = 'bar';
  // data = {
  //   labels: ["loading"],
  //   datasets: [
  //     {
  //       label: "Lenght of Service",
  //       data: [1],
  //       borderColor: '#36A2EB',
  //       backgroundColor: '#9BD0F5',
  //     }
  //   ]
  // }; 
  // options = {
  //   responsive: true,
  //   maintainAspectRatio: false
  // };
  chart: any = [];
  dtOptionsReimbursement: ADTSettings = {};
  dtOptionsLoan: ADTSettings = {};
  dtOptionsReqestHoliday: ADTSettings = {};

  employmentStatus: any = [];
  employmentPosition: any = [];
  gender: any = [];
  lenghtOfService: any = [];
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
    this.datatables();
    this.dashboard();
  }
  genderData : any = [];
  colors : any = [];
  dashboard() {
    this.http.get<any>(environment.api + "home/index", {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        console.log(data);
        this.employmentStatus = data['employmentStatus'];
        this.employmentPosition = data['employmentPosition'];
        this.gender = data['gender'];
        this.genderData = data['genderData'];
        this.lenghtOfService = data['lenghtOfService'];
        this.colors = data['colors'];
        this.initChartJs();
        // this.data.datasets[0].data = data['lenghtOfService']['datasets']; 
        // this.data.labels = data['lenghtOfService']['labels']; 

      }
    )
  }

  initChartJs() {
    this.chart = new Chart('#LenghtofService', {
      type: 'bar',
      data: {
        labels: this.lenghtOfService.labels,
        datasets: [
          {
            label: 'Total Employment',
            data: this.lenghtOfService.datasets,
          },
        ],
      },
      options: {
        animation: {
          duration: 0
        },
        scales: {
          y: {
            beginAtZero: true,
          },
          x: {
            ticks: {
              maxRotation: 90,
              minRotation: 0
            }
          }
        },
        layout: {
        
          // padding: {
          //   top: 550, // Atur tinggi yang diinginkan
          // }
        }
      },

    });

    this.chart = new Chart('#GenderDiversity', {
      type: 'doughnut',
      data: {
        labels: this.genderData.label,
        datasets: [
          {
            label: 'Total Gender',
            data: this.genderData.datasets,
          },
        ],
      }, 
    });

  }

  datatables() {
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

    this.dtOptionsReqestHoliday = {
      ajax: {
        url: environment.api + 'RequestHoliday/waitingApproved',
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
          title: 'ID',
          data: 'personalId',

        },
        {
          title: 'Name',
          data: 'name',
        },
        {
          title: 'Request Days',
          data: 'totalDays',
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


  getHistoryPresence() {
    const params = {
      id: 123,
    };
    this.router.navigate(['timeManagement/reports'], { queryParams: params });
  }
}

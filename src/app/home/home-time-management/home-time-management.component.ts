import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
export class Hero {
  constructor(
    public id: number,
    public company: string,
    public position: string,
    public startYear: any,
    public endYear: any, 
  ) { }
}
@Component({
  selector: 'app-home-time-management',
  templateUrl: './home-time-management.component.html',
  styleUrls: ['./home-time-management.component.css']
})
export class HomeTimeManagementComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: any;
  dtOptionsReimbursement: ADTSettings = {};
  dtOptionsLoan: ADTSettings = {};
  dtTrigger: any = new Subject();
  model : any;
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
  newModel(){
    this.model = new Hero(0,"","","","");
  }
  ngOnInit(): void {
    this.newModel();
     this.httpGet();
  }

  httpGet() { 
    this.dtOptionsReimbursement = {
      ajax: {
        url: environment.api + 'TimeManagementHoliday',
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
          title: 'Request Date',
          data: 'inputDate',

        },
        {
          title: 'Date',
          data: 'date',
        },

        {
          title: 'Approved',
          data: 'approved',
          render: function (data: any, type: any, full: any) {
            let a = "Submit";
            if (data == '1'){
              a = 'Approved';
            }
            if (data == '-1'){
              a = 'Rejected';
            }
            return a;
          }
        },
        {
          title: 'Approved By',
          data: 'name',
        },
        {
          title: 'Approved Date',
          data: 'approvedDate',
          render: function (data: any, type: any, full: any) {
            let a = '';
            if (full['approved'] == '1'){
              a =  data;
            }
            
            return a;
          }
        },
        {
          title: 'Note',
          data: 'note',
        },
       


        // {
        //   title: '',
        //   data: 'id',
        //   searchable: false,
        //   orderable: false,
        //   render: function (data: any, type: any, full: any) {
        //     return `<a href="#/home/reimbursement/detail/${data}"><img src="./assets/img/icons8-edit-48.png" height="20"></a>`;
        //   }
        // },
      ]
    };
   
  }

  addnew(){
     this.httpGet();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }


  open(content: any) {
		this.modalService.open(content, { size: 'lg' });
	}

  onSubmitModel(){

  }
}

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

    public personalId: string,
    public shiftId: string,
    public note: string,
    public startDate: any,
    public endDate: any,
  ) { }
}
@Component({
  selector: 'app-request-holiday',
  templateUrl: './request-holiday.component.html',
  styleUrls: ['./request-holiday.component.css']
})
export class RequestHolidayComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: any;
  dtOptionsReimbursement: ADTSettings = {};
  dtOptionsLoan: ADTSettings = {};
  dtTrigger: any = new Subject();
  model: any;
  selectShift : any = [];
  personal : any = [];
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
  newModel() {
    this.model = new Hero("","", "", "", "");
  }
  ngOnInit(): void {
    this.newModel();
    this.httpGet();
    this.httpSelect();
  }

  httpSelect(){ 
    this.http.get<any>(environment.api + "requestHoliday/select/" , 
    { headers: this.configService.headers() }
    ).subscribe(
      data=>{ 
        this.personal = data['personal'];
        this.selectShift  =  data['selectShift']; 
      },
      e=>{
        console.log(e);
      }
    )
  }
  
  httpGet() {
    this.dtOptionsReimbursement = {
      ajax: {
        url: environment.api + 'requestHoliday',
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
            if (data == '1') {
              a = 'Approved';
            }
            if (data == '-1') {
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
            if (full['approved'] == '1') {
              a = data;
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

  addnew() {
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

  onSubmitModel() {
    console.log(this.model); 
    this.http.post<any>(environment.api + "requestHoliday/onSubmitModel/", this.model , 
    { headers: this.configService.headers() }
    ).subscribe(
      data=>{ 
        console.log(data);
       // this.httpGet();
        this.modalService.dismissAll();
        location.reload();
      },
      e=>{
        console.log(e);
      }
    )
  }
}

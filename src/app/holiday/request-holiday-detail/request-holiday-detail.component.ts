import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { error } from 'jquery';

@Component({
  selector: 'app-request-holiday-detail',
  templateUrl: './request-holiday-detail.component.html',
  styleUrls: ['./request-holiday-detail.component.css']
})
export class RequestHolidayDetailComponent implements OnInit {
  items: any = [];

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private router: Router,
    private http: HttpClient,
    private activeRouter: ActivatedRoute,

    private configService: ConfigService,

  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.httpGet();
  }

  httpGet() {
    this.http.get<any>(environment.api + "requestHoliday/detailRequest", {
      headers: this.configService.headers(),
      params: {
        id: this.activeRouter.snapshot.queryParams['id']
      }
    }).subscribe(
      data => {
        console.log(data);
        this.items = data['items']
      },
      error => {
        console.log(error);
      }
    )
  }
  checkAll: boolean = false;
  fnCheckAll() {
    if (this.checkAll == false) {
      this.checkAll = true;
    }
    else if (this.checkAll == true) {
      this.checkAll = false;
    }

    for (let i = 0; i < this.items.length; i++) {
      this.items[i]['check'] = this.checkAll;
    }

  }
  fnCheck(x: any, i: number) {
    console.log(x, i);
    if (this.items[i]['check'] == "") {
      this.items[i]['check'] = true;
    }
    else if (this.items[i]['check'] == true) {
      this.items[i]['check'] = false;
    }

  }

  back() {
    history.back();
  }

  

  fnApprove(approved : number) {
    const body = {
      items : this.items,
      approved : approved
    }
    this.http.post<any>(environment.api + "requestHoliday/fnApprove",body, {
      headers: this.configService.headers(), 
    }).subscribe(
      data => {
        console.log(data);
        this.httpGet();
      },
      error => {
        console.log(error);
      }
    )
  }

}

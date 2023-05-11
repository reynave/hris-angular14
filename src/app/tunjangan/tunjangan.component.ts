import { Component, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-tunjangan',
  templateUrl: './tunjangan.component.html',
  styleUrls: ['./tunjangan.component.css']
})
export class TunjanganComponent implements OnInit {
  items: any = [];
  insert: any = {
    label: "",
    sorting: "",
    value: "",

  };
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
  }

  httpGet() {
    this.http.get<any>(environment.api + "tunjangan", {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        console.log(data);
        this.items = data['items'];
      }
    )
  }

  fnUpdate() {
    const body = {
      items: this.items
    }
    this.http.post<any>(environment.api + "tunjangan/fnUpdate", body, {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        this.httpGet();
      }
    )
  }
  back() {
    history.back();
  }

  fnAdd() {
    console.log(this.insert);
    const body = {
      item: this.insert,
    }
    this.http.post<any>(environment.api + "tunjangan/fnAdd", body, {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        console.log(data);
        this.httpGet();
      }
    )
  }

  fnDel(id: string) {
    const body = {
      id: id,
    }
    if (confirm("Delete this item?")) {  
      this.http.post<any>(environment.api + "tunjangan/fnDel", body, {
        headers: this.configService.headers(),
      }).subscribe(
        data => {
          console.log(data);
          this.httpGet();
        }
      )
    }

  }


}

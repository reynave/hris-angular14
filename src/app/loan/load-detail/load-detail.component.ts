import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-load-detail',
  templateUrl: './load-detail.component.html',
  styleUrls: ['./load-detail.component.css']
})
export class LoadDetailComponent implements OnInit {
  selectPersonal: any = [];
  today: any = new Date();
  model: any = [];
  id: string = "";
  items: any = [];
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private router: Router,
    private http: HttpClient,
    private configService: ConfigService,

    private activatedRoute: ActivatedRoute,

  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.httpGet();
    this.httpSelect();
  }
  httpSelect() {
    this.http.get<any>(environment.api + "loan/select", { headers: this.configService.headers() })
      .subscribe(
        data => {
          console.log(data);
          this.selectPersonal = data['selectPersonal'];
        }
      )
  }

  httpGet() {

    this.http.get<any>(environment.api + 'loan/detail/' + this.activatedRoute.snapshot.params['id'], {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        this.items = data['data'];
      }
    )

  }
  onSubmit() {
    const body = {
      item: this.model,
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
  back() {
    history.back();
  }
}

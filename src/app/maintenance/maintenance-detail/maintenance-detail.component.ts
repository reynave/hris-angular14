import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export class Model {

  constructor(
    public equipmentId: number,
    public description: string,
    public categoryId: number,
    public purchaseDate: any,
    public supplier: string,
    public warantyUntil: any,
    public location: string,
    public schedule: number,

  ) { }

}

export class Transaction {

  constructor(
    public cost: string,
    public scheduleDate: any,
    public note: string,
  ) { }

}

@Component({
  selector: 'app-maintenance-detail',
  templateUrl: './maintenance-detail.component.html',
  styleUrls: ['./maintenance-detail.component.css']
})
export class MaintenanceDetailComponent implements OnInit {
  loading: boolean = false;
  item: any = [];
  model: any = new Model(0, "", 0, "", "", "", "", 1);
  transaction: any = new Transaction("0", "", "");
  equipment: any = [];
  category: any = [];
  id: string = "";
  images : any = [];
  schedule: any = [];
  editable: boolean = false;
  scheduleDetail : any = [];
  constructor(
    private router: Router,
    private http: HttpClient,
    private configService: ConfigService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.httpGet();
  }
  httpGet() {
    this.loading = true;
    this.http.get<any>(environment.api + "maintenance/detail/" + this.id, { headers: this.configService.headers() })
      .subscribe(
        data => {
          this.images = data['images'];
          this.item = data['item'];

       


          let warantyUntil = data['item']['warantyUntil'].split("-");
          let purchaseDate = data['item']['purchaseDate'].split("-");


          this.model['schedule'] = data['item']['schedule'];
          this.model['equipmentId'] = data['item']['equipmentId'];
          this.model['description'] = data['item']['description'];
          this.model['categoryId'] = data['item']['categoryId'];
          this.model['purchaseDate'] = data['item']['purchaseDate'];
          this.model['supplier'] = data['item']['supplier'];

          this.model['location'] = data['item']['location'];

          this.model['warantyUntil'] = {
            year: parseInt(warantyUntil['0']),
            month: parseInt(warantyUntil['1']),
            day: parseInt(warantyUntil['2']),
          };
          this.model['purchaseDate'] = {
            year: parseInt(purchaseDate['0']),
            month: parseInt(purchaseDate['1']),
            day: parseInt(purchaseDate['2']),
          };



          this.item = data['item'];
          this.loading = false;
          this.equipment = data['equipment'];
          this.category = data['category'];
          this.schedule = data['schedule'];
          console.log(data);
        },
        e => {
          console.log(e);
        }
      )
  }
  back() {
    history.back();
  }

  onSubmit() {
    const body = {
      id: this.id,
      item: this.model,
    }
    this.http.post<any>(environment.api + "maintenance/update", body, {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        console.log(data);
        this.editable = false;
      },
      e => {
        console.log(e);
      }
    )
  }

  fnAddTrans() {
    this.loading = true;
    const body = {
      item: this.transaction,
      id: this.id,
    }
    this.http.post<any>(environment.api + "maintenance/fnAddTrans", body, {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        console.log(data);
        this.modalService.dismissAll();
        this.httpGet();
      },
      e => {
        console.log(e);
      }
    )
  }

  fnDeleteTrans(x: any) {
    if (confirm("Delete this transaction ?")) {
      this.loading = true;
      const body = {
        item: x,
      }
      this.http.post<any>(environment.api + "maintenance/fnDeleteTrans", body, {
        headers: this.configService.headers(),
      }).subscribe(
        data => {
          console.log(data);
          this.httpGet();
        },
        e => {
          console.log(e);
        }
      )
    }
  }

  fnRemoveImg(){

  }

  fnDoneTrans() {
    
      this.loading = true;
      const body = {
        item: this.scheduleDetail,
        scheduleDetailDate : this.scheduleDetailDate,
        id : this.id,
      }
      this.http.post<any>(environment.api + "maintenance/fnDoneTrans", body, {
        headers: this.configService.headers(),
      }).subscribe(
        data => {
          console.log(data);
          this.modalService.dismissAll();
          this.httpGet();
        },
        e => {
          console.log(e);
        }
      ) 
  }

  cancel() {
    this.editable = false;
    this.httpGet();
  }

  open(content: any) {
    this.modalService.open(content, { size: 'md' });
  } 
  scheduleDetailDate : any = [];
  openScheduleDetail(content: any, x : any) {
    console.log(x);
    this.scheduleDetail = x; 
    let date = x['scheduleDate'].split("-");

    this.scheduleDetailDate = {
      year: parseInt(date['0']),
      month: parseInt(date['1']),
      day: parseInt(date['2']),
    };
    this.modalService.open(content, { size: 'md' });
  } 

  img : string = "";
  zoom(content: any, img:string) {
    this.img = img;
    this.modalService.open(content, { size: 'lg' });
  }
}

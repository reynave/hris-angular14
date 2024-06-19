import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from 'src/app/service/config.service';
import { environment } from 'src/environments/environment';
import { InvetoryDetailPersonalComponent } from '../invetory-detail-personal/invetory-detail-personal.component';

export class Model {
  constructor(
    public personalId: string,
    public note: string, 
    public loanDate: any,
    public returnDate: any,
    public qty: number,
    
  ) { }
}

@Component({
  selector: 'app-invetory-detail',
  templateUrl: './invetory-detail.component.html',
  styleUrls: ['./invetory-detail.component.css']
})
export class InvetoryDetailComponent implements OnInit {
  items :any = [];
  id : string = '';
  personal : any = [];
  header : any = [];
  model: any = new Model("", "", [], [],1 );
  constructor(
    private http: HttpClient,
    private configService: ConfigService, 
    private modalService: NgbModal,
    private activeRouter : ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id = this.activeRouter.snapshot.queryParams['id'];
    this.httpGet();
  }

  httpGet(){
    this.http.get<any>(environment.api+"inventory/detail",{
      headers:this.configService.headers(),
      params : {
        id : this.id ,
      }
    }).subscribe(
      data=>{
        console.log(data);
        this.personal = data['personal'];
        this.header = data['header']
        this.items = data['items']
      },
      error=>{
        console.log(error);
      },
    )
  }

  remove( item :any){
    if(confirm("Mengembalikan barang pinjaman")){
      const body = { 
        inventoryId : this.id, 
        item : item
      }
      this.http.post<any>(environment.api+"inventory/remove", body, {
        headers:this.configService.headers(), 
      }).subscribe(
        data=>{
          console.log(data);
          this.httpGet();
        },
        error=>{
          console.log(error);
        },
      )
    }
  }

  open(content: any) {
		this.modalService.open(content);
	}

  onSubmit(){
    const body = { 
      inventoryId : this.id, 
      item : this.model
    }
    this.http.post<any>(environment.api+"inventory/onSubmit", body, {
      headers:this.configService.headers(), 
    }).subscribe(
      data=>{
        console.log(data);
        this.httpGet();
      },
      error=>{
        console.log(error);
      },
    )
  }

   


}

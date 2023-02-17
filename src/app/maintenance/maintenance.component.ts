import { Component, OnInit } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import {  Router } from '@angular/router';

export class Model {

  constructor(
    public equipment: string,
    public description: string,
    public categoryId: number,
    public purchaseDate: any,
    public supplier: string,
    public warantyUntil: any,
    public location: string,
    public schedule: number,
    
  ) { }

}


@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {
  dtOptions: ADTSettings = {}; 
  model: any = new Model("", "", 0, "", "", "", "",1);
  equipment: any = [];
  category: any = [];
  addEquipment : boolean = false;
  insertEquipment : string = "";
  
  addCategory : boolean =  false;
  insertCategory: string = "";

  constructor(
    private configService: ConfigService,
    private modalService: NgbModal,
    private http: HttpClient,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.httpGet();
    this.datatables();
  }

  httpGet() {
    this.http.get<any>(environment.api + "maintenance/select", {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        this.equipment = data['equipment'];
        this.category = data['category']; 
        console.log(data);
      }
    );
  }

  datatables() {
    this.dtOptions = {
      ajax: {
        url: environment.api + 'maintenance',
        type: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Token': this.configService.varToken,
        },
      },
      columns: [
        {
          title: 'Equipment',
          data: 'equipment',
        },
        {
          title: 'Category',
          data: 'category',
        },
        {
          title: 'Purchase Date',
          data: 'purchaseDate',
        },
        {
          title: 'Waranty Until',
          data: 'warantyUntil',
        },
        {
          title: 'Detail',
          data: 'id',
          searchable: false,
          orderable : false,
          render: function (data: any, type: any, full: any) {
            return '<a class="btn btn-sm btn-outline-dark" href="#/maintenance/' + data + '">Detail</a>';
          }
        },
      ]
    };
  }

  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  onSubmit() {
    const body = {
      item: this.model,
      //insertEquipment : this.insertEquipment,
      insertCategory : this.insertCategory
    }

    this.http.post<any>(environment.api + "maintenance/insert", body, {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/maintenance/'+data['id']]).then( ()=>{
          this.modalService.dismissAll();
        }); 
      },
      e => {
        console.log(e);
      }
    )
  }

  fnAddEquipment(){
    this.addEquipment = true;
  }

  addTempEq(id:number){
    if(id == 0){
      this.insertEquipment = "";
    }else{
      this.model.equipmentId = 999999;
    }  
  }
  addTempCat(id:number){
    if(id == 0){
      this.insertCategory= "";
    }else{
      this.model.categoryId = 999999;
    }  
  }

  cancelEquipment(){
    this.addEquipment = false;
    this.insertEquipment = "";
    this.model.equipmentId = 0;
    this.addTempEq(0);
  }


  fnAddCategory(){
    this.addCategory = true;
  }

  cancelCategory(){
    this.addCategory = false;
    this.insertCategory = "";
    this.model.categoryId = 0;
    this.addTempCat(0);
   
  }
}

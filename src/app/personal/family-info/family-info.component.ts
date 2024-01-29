import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export class Hero {
  constructor(
    public id: number,
    public name: string,
    public relationship: string,
    public dateOfBirth: any,
    public ktpId : string,
    public maritalStatus : string,
    public gender : string,
    public job : string,
    public address : string,
    public phone : string,
    public asEmergencyContact : boolean,
     
   
  ) {  }
}

@Component({
  selector: 'app-family-info',
  templateUrl: './family-info.component.html',
  styleUrls: ['./family-info.component.css']
})
export class FamilyInfoComponent implements OnInit {
  model :any;;
  selectMaritalStatus : any = [];
  selectRelationship : any = [];
  items : any = [];
  itemsEC : any = [];
 
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private http: HttpClient,
    private configService: ConfigService,
    private activatedRoute: ActivatedRoute,
  ) {}
  newModel(){
    this.model = new Hero(0, '',  "",  { "year": 1990, "month": 1, "day": 1 }, "","" ,"","","","",false);
  }
  ngOnInit(): void {
    this.newModel();
      this.httpDetail();
      this.httpGet();
      
  }
  httpGet(){
    this.http.get<any>(environment.api + "family/index/" + this.activatedRoute.snapshot.params['id'], {
      headers: this.configService.headers(),
    }).subscribe(
      data=>{ 
        console.log(data);
        this.items = data['items']; 
         this.itemsEC = data['itemsEC']; 
        
      },
      error=>{
        console.log(error);
      }
    )
  }

  httpDetail(){
    this.http.get<any>(environment.api + "family/detail/" + this.activatedRoute.snapshot.params['id'], {
      headers: this.configService.headers(),
    }).subscribe(
      data=>{
      
        console.log(data);
        this.selectRelationship = data['relationship'];
        this.selectMaritalStatus = data['maritalStatus'];
        
      },
      error=>{
        console.log(error);
      }
    )
  }

  open(content: any, x : any = false) {
    this.newModel();
    if(x != false){
      let dateOfBirth = x.dateOfBirth.split("-");

      this.model.id =  x.id;
      this.model.address =  x.address;
      this.model.name = x.name;
      this.model.relationship = x.relationship; 
      this.model.dateOfBirth= {
        year: parseInt(dateOfBirth['0']),
        month: parseInt(dateOfBirth['1']),
        day: parseInt(dateOfBirth['2']),
      };
      this.model.ktpId = x.ktpId;
      this.model.maritalStatus  = x.maritalStatus;
      this.model.gender  = x.gender;
      this.model.job  = x.job; 
      this.model.phone = x.phone; 
      this.model.asEmergencyContact = x.asEmergencyContact == '1' ? true : false; 
     
    }
		this.modalService.open(content, { size: 'lg' });
	}
  onSubmit(){
    console.log(this.model);
    const body = {
      personalId : this.activatedRoute.snapshot.params['id'],
      model: this.model,
    }
    this.http.post<any>(environment.api + "family/onSubmit", body, {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        console.log(data); 
        this.httpGet();
        this.modalService.dismissAll();
      },
      e => {
        console.log(e);
      }
    )
  }
  fnDelete(x :any){
    if(confirm("Delete this item")){ 
      const body = {
        id : x.id, 
      }
      this.http.post<any>(environment.api + "family/fnDelete", body, {
        headers: this.configService.headers(),
      }).subscribe(
        data => { 
          this.httpGet(); 
        },
        e => {
          console.log(e);
        }
      )
    }
  }
}

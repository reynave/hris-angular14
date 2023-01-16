import { Component, OnInit } from '@angular/core';  
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';  

export class Model {

  constructor(
    public name: string,
    public phone: string,
    public email: string,
    public gender: string,
    public birthPlace: string,
    public birthDate: any,
    public marital: string,
    public blood: string,
    public religion: string,
    public idType: number,
    public idNumber: string,
    public expDate: any,
    public permanent: boolean,
    public postalCode: string,
    public address: string,

  ) { }

}
@Component({
  selector: 'app-personal-detail',
  templateUrl: './personal-detail.component.html',
  styleUrls: ['./personal-detail.component.css']
})
export class PersonalDetailComponent implements OnInit {
  model: any = new Model("", "", "", "", "", "", "","","",0,"","",false,"","");
  readonly : boolean = true;
  constructor( 
    private router: Router,
    private http: HttpClient,
    private configService: ConfigService, 
    private activatedRoute : ActivatedRoute,
  ) { }

  ngOnInit(): void {
 
  }

  fnDelete(){
    if(confirm("Delete this employed ?")){
      const body = {
       id : this.activatedRoute.snapshot.params['id'],
      }
      this.http.post<any>(environment.api + "personal/fnDelete", body, {
        headers: this.configService.headers(),
      }).subscribe(
        data => {
          console.log(data);
          this.back();
        },
        e => {
          console.log(e);
        }
      )
  
    }
  }
  fnSave(){
    this.readonly = true;
  }
  back() {
    history.back();
  }

}

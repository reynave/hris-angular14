import { Component, OnInit } from '@angular/core'; 
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  
  items : any = [];
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
    this.http.get<any>(environment.api+"organization/index", {
      headers: this.configService.headers(),
    }).subscribe(
      data=>{
        this.items = data['items'];
        console.log(data);
      }
    )
  }
  fnUpdate( data : any, table : string) {
    console.log(data); 
    const body = {
      data :data,
      table : table,
    }
    this.http.post<any>(environment.api+'organization/fnUpdate',body,{
      headers : this.configService.headers()
    }).subscribe(
      data=>{
        console.log(data);
      }
    )
  }
  fnDelete( data : any, table : string) {
    if(confirm("Delete this data ?")){
      console.log(data); 
      const body = {
        data :data,
        table : table,
      }
      this.http.post<any>(environment.api+'organization/fnDelete',body,{
        headers : this.configService.headers()
      }).subscribe(
        ()=>{
          this.httpGet();
        }
      )
    }
  }

  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }
}

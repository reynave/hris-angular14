import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Editor } from 'ngx-editor';
import { ConfigService } from '../service/config.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-invetory',
  templateUrl: './invetory.component.html',
  styleUrls: ['./invetory.component.css']
})
export class InvetoryComponent implements OnInit {
  items :any = [];
  constructor(
    private http: HttpClient,
    private configService: ConfigService, 
  ) { }

  ngOnInit() {
    this.httpGet();
  }

  httpGet(){
    this.http.get<any>(environment.api+"inventory/index",{
      headers:this.configService.headers(),
    }).subscribe(
      data=>{
        console.log(data);
        this.items = data['items']
      },
      error=>{
        console.log(error);
      },
    )
  }

  fnDelete(x:any){

  }

  addRow(){

  }

  onUpdate(){

  }

}

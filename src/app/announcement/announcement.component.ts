import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Editor } from 'ngx-editor';
import { ConfigService } from '../service/config.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit, OnDestroy {
  editor:  any = Editor;
  editors: Editor[] = [];
  html: any =  '<h1>abcd</h1>123';
  items : any = [];
  
  constructor(
    private http: HttpClient,
    private configService: ConfigService, 
  ) { }
  
  ngOnInit(): void {
    this.editor = new Editor();

    this.httpGet();
  }

  httpGet(){
    this.http.get<any>(environment.api+"announcement/index",{
      headers: this.configService.headers(),
    }).subscribe(
      data=>{
        
        this.items = data['items'];
        data['items'].forEach((item: any, index:  number) => {
          this.editors[index] = new Editor();
        });
        console.log(data);
      },
      error=>{
        console.log(error);
      }
    )
  }
  fnDelete(item:any){
    if(confirm("Delete this ANNOUNCEMENT ? ")){ 
      const body ={
        item : item,
      }
      this.http.post<any>(environment.api+"announcement/fnDelete", body, {
        headers:this.configService.headers(),
      }).subscribe(
        data=>{
          console.log(data);
          this.httpGet();
        },
        error=>{
          console.log(error);
        }
      )
    }
  }
  ngOnDestroy(): void {
    this.editor.destroy();
    this.editors.forEach(editor => editor.destroy());
  }
  onChange(html: object) {
    this.html = '';
  }

  onUpdate(){
    console.log(this.items);
   
    const body ={
      items : this.items,
    }
    this.http.post<any>(environment.api+"announcement/onUpdate", body, {
      headers:this.configService.headers(),
    }).subscribe(
      data=>{
        console.log(data);
      },
      error=>{
        console.log(error);
      }
    )
  }

  addRow(){ 
    const body ={
      add : true,
    }
    this.http.post<any>(environment.api+"announcement/addRow", body, {
      headers:this.configService.headers(),
    }).subscribe(
      data=>{
        this.httpGet() 
      },
      error=>{
        console.log(error);
      }
    )
  }
}

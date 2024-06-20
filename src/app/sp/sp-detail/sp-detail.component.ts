import { HttpClient } from '@angular/common/http';
import { Component,   OnInit } from '@angular/core';  
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from 'src/app/service/config.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-sp-detail',
  templateUrl: './sp-detail.component.html',
  styleUrls: ['./sp-detail.component.css']
})
export class SpDetailComponent implements OnInit {
  items :any = [];
  id : string = "";
  personal : any = [];
  newItem : any = {
    name : "",
    qty : 1,
  }
  api : string = environment.api;
  editable : boolean = false;
  constructor(
    private http: HttpClient,
    private configService: ConfigService, 
    private modalService: NgbModal,
    private activeRouter : ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.activeRouter.snapshot.queryParams['id'];
    this.httpGet();
  }

  httpGet(){
    this.http.get<any>(environment.api+"sp/detail",{
      headers:this.configService.headers(),
      params : {
        id  : this.id
      }
    }).subscribe(
      data=>{
        console.log(data);
        this.items = data['items'];
        this.personal = data['personal'] 
      },
      error=>{
        console.log(error);
      },
    )
  }

  remove(item:any){
    if(confirm("Delete this SP ?")){
      const body = {
        item : item, 
      }
      this.http.post<any>(environment.api+"sp/remove",body,{
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

  onUpdate(){
    this.editable= false; 
    const body = {
      id : this.id,
      items :  this.items,
    }
    this.http.post<any>(environment.api+"sp/onUpdate",body,{
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
  
  onAddRow(){ 
    const body = {
      personalId : this.id, 
    }
    this.http.post<any>(environment.api+"sp/onAddRow",body,{
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

  back(){
    history.back();
  }

  onUpdateUploadSp(data  :any, id : string){ 
    const body = {
      id : id,
      uploadFile :  data['data']['upload_data'],
    }
    this.http.post<any>(environment.api+"sp/onUpdateUploadSp",body,{
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
  open(content: any) {
		this.modalService.open(content);
	}
  loading : boolean = false;
  fileName = '';
  httpNote: string = "";  
  upload_data : any = [];
  onFileSelected(event: any, item:any) {
    const file: File = event.target.files[0];
    if (file) {
      this.httpNote = "Upload..";
      this.loading = true;
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("item", file);
      formData.append("token", "W1A5$ftvd147&");
      formData.append("id", item.id);  
     
      //formData.append("token", this.configService.getToken()); 
      this.http.post<any>(environment.api + "upload/sp", formData).subscribe(
        data => {
          this.loading = false;
          console.log(data); 
          if(data['error'] == false) {
            this.upload_data = data['data']['upload_data'];


            this.onUpdateUploadSp(data, item.id);

          }
      
          this.httpNote = ""; 
        },
        e => {
          this.httpNote = "Upload error!";
          console.log(e)
        });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';

export class Model {
  constructor(
    public checkIn: string,
    public checkOut: string,
    public shiftId: string,
    public overTime: string,
    public offTimeId: string,
  ) { }
}
@Component({
  selector: 'app-time-management-import',
  templateUrl: './time-management-import.component.html',
  styleUrls: ['./time-management-import.component.css']
})
export class TimeManagementImportComponent implements OnInit {
  id: string = "";
  loading: boolean = false;
  model: any = new Model("", "", "", "", "");
  timeManagementShift: any = [];
  items: any = [];
  item : any = [];
  constructor(
    private router: Router,
    private http: HttpClient,
    private configService: ConfigService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void { 
    this.httpGet();
  }

  httpGet() {
    this.loading = true;
    this.http.get<any>(environment.api + "timeManagement/logs/", {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        this.loading = false;
        this.items = data['items'];
        console.log(data);

      });
  }

  back() {
    history.back();
  }

 
  fileName = '';
  httpNote: string = "";  
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.httpNote = "Upload..";
      this.loading = true;
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("item", file);
      formData.append("token", "123");
     
      //formData.append("token", this.configService.getToken()); 
      this.http.post<any>(environment.api + "upload/uploadItem", formData).subscribe(
        data => {
          this.loading = false;
          console.log(data); 
          this.httpNote = "";
          this.httpGet();
          this.attendanceInsert(data);
        },
        e => {
          this.httpNote = "Upload error!";
          console.log(e)
        });
    }
  }

  attendanceInsert( data : any){
    this.httpNote = "Sync, Please wait..";
    const body ={
      item : data['insert'],
      id : data['id'],
    }
    this.http.post<any>(environment.api + "timeManagement/attendanceInsert", body,{
      headers:this.configService.headers(),
    }).subscribe(
      data => {
        this.loading = false;
        this.httpNote = "";
        this.httpGet();
        console.log(data);  
      },
      e => {
        this.httpNote = "Upload error!";
        console.log(e)
      });
  } 

}

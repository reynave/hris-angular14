import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-bpjs-setting',
  templateUrl: './bpjs-setting.component.html',
  styleUrls: ['./bpjs-setting.component.css']
})
export class BpjsSettingComponent implements OnInit {
 
  items : any = [];
  loading : boolean= false;
 readonly : boolean = true;
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
    this.http.get<any>(environment.api + "bpjs/setting/", {
      headers: this.configService.headers(),
    }).subscribe(
      data => { 
        this.readonly = true;
        this.items = data['items']; 
        this.loading = false;  
        console.log(data);  
      },
      e => {
        console.log(e);
      }
    )
  }

  fnEditable(){
    this.readonly = false;
  }

  fnSave() {
    const body = { 
      items :   this.items,
    };
    this.http.post<any>(environment.api + "bpjs/fnSaveSetting", body, {
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

  fnCancel(){
   this.httpGet();
   this.readonly = true;
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-pph21-setting',
  templateUrl: './pph21-setting.component.html',
  styleUrls: ['./pph21-setting.component.css']
})
export class Pph21SettingComponent implements OnInit {
  ptkp: any = []; 
  tarif_pajak : any = [];
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
    this.http.get<any>(environment.api + "pph21/ptkp/", {
      headers: this.configService.headers(),
    }).subscribe(
      data => { 
        this.readonly = true;
        this.ptkp = data['ptkp'];
        this.tarif_pajak = data['tarif_pajak']
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
      ptkp: this.ptkp,
      tarif_pajak : this.tarif_pajak,
    };
    this.http.post<any>(environment.api + "pph21/fnSave", body, {
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

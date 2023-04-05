import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-maintenance-master',
  templateUrl: './maintenance-master.component.html',
  styleUrls: ['./maintenance-master.component.css']
})
export class MaintenanceMasterComponent implements OnInit {
  loading: boolean = false; 
  maintenance_category : any = [];
  maintenance_sparepart : any = [];
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
    this.http.get<any>(environment.api + "MaintenanceMaster", {
      headers: this.configService.headers(),
    }).subscribe(
      data => {  
        this.maintenance_category = data['maintenance_category']; 
        this.maintenance_sparepart = data['maintenance_sparepart'];  
        console.log(data);
      },
      e => {
        console.log(e);
      }
    )
  }
   
  fnSave_maintenance_category() {
    this.loading = true;
    this.http.post<any>(environment.api + "MaintenanceMaster/fnSave_maintenance_category", this.maintenance_category, {
      headers: this.configService.headers(),
    }).subscribe(
      () => {
        this.loading = false;
        this.httpGet();
      }
    )
  }   

  fnSave_maintenance_sparepart() {
    this.loading = true;
    this.http.post<any>(environment.api + "MaintenanceMaster/fnSave_maintenance_sparepart", this.maintenance_sparepart, {
      headers: this.configService.headers(),
    }).subscribe(
      () => {
        this.loading = false;
        this.httpGet();
      }
    )
  } 

  fnDelete(table: any, x: any) {

    if (confirm("Delete this item ?")) { 
      this.loading = true;
      const body = {
        table: table,
        item: x,
      }
      this.http.post<any>(environment.api + "MaintenanceMaster/fnDelete", body, {
        headers: this.configService.headers(),
      }).subscribe(
        () => {
          this.loading = false;
          this.httpGet();
        }
      )
    }
  }

  fnInsert(val: string) {
    this.loading = true;
    const body = {
      table: val
    }
    this.http.post<any>(environment.api + "MaintenanceMaster/fnInsert", body, {
      headers: this.configService.headers(),
    }).subscribe(
      () => {
        this.loading = false;
        this.httpGet();
      }
    )
  }

}

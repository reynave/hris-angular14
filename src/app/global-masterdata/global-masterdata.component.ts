import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
@Component({
  selector: 'app-global-masterdata',
  templateUrl: './global-masterdata.component.html',
  styleUrls: ['./global-masterdata.component.css']
})
export class GlobalMasterdataComponent implements OnInit {
  loading: boolean = false;
  employment_joblevel: any = [];
  employment_jobposition : any = [];
  reimbursement_name : any = [];
  time_management_shift : any = [];
  global_setting_jabatan : any = [];
  
  maintenance_category : any = [];
  maintenance_equipment : any = [];
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
    this.http.get<any>(environment.api + "globalSetting", {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        this.global_setting_jabatan = data["global_setting_jabatan"];
        this.employment_joblevel = data['employment_joblevel'];
        this.reimbursement_name = data['reimbursement_name']; 

        this.maintenance_category = data['maintenance_category']; 
        this.maintenance_equipment = data['maintenance_equipment']; 

        this.employment_jobposition = data['employment_jobposition'].map(function(el : any){
           el['_masterData'] = el['_masterData'] == 1 ? true : false;
           el['_reimbursement'] = el['_reimbursement'] == 1 ? true : false;
           el['_timeManagement'] = el['_timeManagement'] == 1 ? true : false;
           el['_loan'] = el['_loan'] == 1 ? true : false;
           el['_payroll'] = el['_payroll'] == 1 ? true : false;  
          return el;
        });
        this.time_management_shift = data['time_management_shift'].map(function(el : any){
          el['Sun'] = el['Sun'] == 1 ? true : false;
          el['Mon'] = el['Mon'] == 1 ? true : false;
          el['Tue'] = el['Tue'] == 1 ? true : false;
          el['Wed'] = el['Wed'] == 1 ? true : false;
          el['Thu'] = el['Thu'] == 1 ? true : false;  
          el['Fri'] = el['Fri'] == 1 ? true : false;  
          el['Sat'] = el['Sat'] == 1 ? true : false;  
          
         return el;
       });


        console.log(data);
      },
      e => {
        console.log(e);
      }
    )
  }

  fnSave_global_setting_jabatan() {
    this.loading = true;
    this.http.post<any>(environment.api + "globalSetting/fnSave_global_setting_jabatan", this.global_setting_jabatan, {
      headers: this.configService.headers(),
    }).subscribe(
      () => {
        this.loading = false;
        this.httpGet();
      }
    )
  }
  fnSave_employment_joblevel() {
    this.loading = true;
    this.http.post<any>(environment.api + "globalSetting/fnSave_employment_joblevel", this.employment_joblevel, {
      headers: this.configService.headers(),
    }).subscribe(
      () => {
        this.loading = false;
        this.httpGet();
      }
    )
  }



  fnSave_maintenance_equipment() {
    this.loading = true;
    this.http.post<any>(environment.api + "globalSetting/fnSave_maintenance_equipment", this.maintenance_equipment, {
      headers: this.configService.headers(),
    }).subscribe(
      () => {
        this.loading = false;
        this.httpGet();
      }
    )
  }
  fnSave_maintenance_category() {
    this.loading = true;
    this.http.post<any>(environment.api + "globalSetting/fnSave_maintenance_category", this.maintenance_category, {
      headers: this.configService.headers(),
    }).subscribe(
      () => {
        this.loading = false;
        this.httpGet();
      }
    )
  }





  fnSave_time_management_shift() {
    this.loading = true;
    this.http.post<any>(environment.api + "globalSetting/fnSave_time_management_shift", this.time_management_shift, {
      headers: this.configService.headers(),
    }).subscribe(
      () => {
        this.loading = false;
        this.httpGet();
      }
    )
  }
  fnSave_employment_jobposition() {
    this.loading = true;
    this.http.post<any>(environment.api + "globalSetting/fnSave_employment_jobposition", this.employment_jobposition, {
      headers: this.configService.headers(),
    }).subscribe(
      () => {
        this.loading = false;
        this.httpGet();
      }
    )
  }
  fnSave_reimbursement_name() {
    this.loading = true;
    this.http.post<any>(environment.api + "globalSetting/fnSave_reimbursement_name", this.reimbursement_name, {
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
      this.http.post<any>(environment.api + "globalSetting/fnDelete", body, {
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
    this.http.post<any>(environment.api + "globalSetting/fnInsert", body, {
      headers: this.configService.headers(),
    }).subscribe(
      () => {
        this.loading = false;
        this.httpGet();
      }
    )
  }
}

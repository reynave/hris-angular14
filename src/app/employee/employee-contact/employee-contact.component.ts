import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-employee-contact',
  templateUrl: './employee-contact.component.html',
  styleUrls: ['./employee-contact.component.css']
})
export class EmployeeContactComponent implements OnInit {
  readonly: boolean = true;
  item: any = [];
  globalSetting : any = [];
  loading: boolean = false;
  id: string = ""; 
  personal :  any = [];

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
    this.http.get<any>(environment.api + "employee/contact/" + this.activatedRoute.snapshot.params['id'], {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        this.item = data['item'][0];
        this.globalSetting = data['globalSetting'];
        this.personal = data['personal'][0];
        this.loading = false;
        console.log(data); 
      }
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  switch_expression: string = "";
  employmentId: string = "";
  payrollId: string = ""; 
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private activatedRoute: ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.switch_expression = this.activatedRoute.snapshot.queryParams['tab'];
    this.httpGet();
  }


  httpGet() {
    this.http.get<any>(environment.api + "employee/detail/" + this.activatedRoute.snapshot.params['id'],
      {
        headers: this.configService.headers(),
      }).subscribe(
        data => {
          console.log(data);
          this.employmentId = data['employmentId'];
          this.payrollId = data['payrollId'];
        },
        e => {
          console.log(e);
        }
      )
  }

  tab(val: string) {
    this.switch_expression = val; 
  }
  back() {
    history.back();
  }
  fnCreate(value: string) {
    console.log(value, this.activatedRoute.snapshot.params['id']);

    const body = {
      value: value,
      id: this.activatedRoute.snapshot.params['id'],
    }
    this.http.post<any>(environment.api + "employee/fnCreate/", body, {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        console.log(data);
        this.httpGet();
      }
    );
  }
}

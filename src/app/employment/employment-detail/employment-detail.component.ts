import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
export class Model {

  constructor(
    public approvalLineId: string,
    public branchId: string,
    public dateJoinEnd: any,
    public dateJoinStart: any,
    public employmentStatusId: string,
    public jobLevelId: string,
    public jobPositionId: string,
    public organizationId: string,

  ) { }

}
@Component({
  selector: 'app-employment-detail',
  templateUrl: './employment-detail.component.html',
  styleUrls: ['./employment-detail.component.css']
})
export class EmploymentDetailComponent implements OnInit {
  model: any = new Model("", "", "", "", "", "", "", "");
  readonly: boolean = true;
  item: any = [];
  loading: boolean = false;
  id: string = "";
  personalId: string = "";
  personalName: string = "";
  employmentStatus: any = [];
  approvedLine: any = [];
  jobPosition: any = [];
  jobLevel: any = [];
  organization: any = [];
  branch: any = [];
  addOrganization: boolean = false;
  inputOrganization: string = "";
  inputBranch: string = "";

  addBranch: boolean = false;
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
    this.http.get<any>(environment.api + "employment/detail/" + this.activatedRoute.snapshot.params['id'], {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        this.loading = false;
        console.log(data);
        this.id = data['id'];
        this.personalId = data['item'][0]['personalId'];
        this.personalName = data['item'][0]['name'];
        this.employmentStatus = data['employmentStatus'];
        this.approvedLine = data['approvedLine'];
        this.jobPosition = data['JobPosition'];
        this.jobLevel = data['JobLevel'];
        this.organization = data['organization'];
        this.branch = data['branch'];

        this.item = data['item'][0];
        let dateJoinStart = data['item'][0]['dateJoinStart'].split("-");
        let dateJoinEnd = data['item'][0]['dateJoinEnd'].split("-");

        this.model['name'] = data['item'][0]['name'];
        this.model['branchId'] = data['item'][0]['branchId'];
        this.model['employmentStatusId'] = data['item'][0]['employmentStatusId'];
        this.model['jobLevelId'] = data['item'][0]['jobLevelId'];
        this.model['jobPositionId'] = data['item'][0]['jobPositionId'];
        this.model['organizationId'] = data['item'][0]['organizationId'];
        this.model['approvalLineId'] = data['item'][0]['approvalLineId'];

        this.model['dateJoinStart'] = {
          year: parseInt(dateJoinStart['0']),
          month: parseInt(dateJoinStart['1']),
          day: parseInt(dateJoinStart['2']),
        };
        this.model['dateJoinEnd'] = {
          year: parseInt(dateJoinEnd['0']),
          month: parseInt(dateJoinEnd['1']),
          day: parseInt(dateJoinEnd['2']),
        };


      },
      e => {
        console.log(e);
      }
    )
  }

  insertOrganization() {
    if (this.inputOrganization != "") {
      const body = {
        name: this.inputOrganization,
        employmentId: this.id,
      }
      this.http.post<any>(environment.api + "organization/insert/", body, {
        headers: this.configService.headers(),
      }).subscribe(
        data => {
          console.log(data);
          this.addOrganization = false;
          this.httpGet();
        }
      )

    }
  }

  insertBranch() {
    if (this.inputBranch != "") {
      const body = {
        name: this.inputBranch,
        employmentId: this.id,
        organizationId: this.model['organizationId'], 
      }
      this.http.post<any>(environment.api + "branch/insert/", body, {
        headers: this.configService.headers(),
      }).subscribe(
        data => {
          console.log(data);
          this.addOrganization = false;
          this.addBranch = false;
          
          this.httpGet();
        }
      )

    }
  }

  fnSelectBranch() {
    this.addBranch = false;
    console.log(environment.api + "organization/branch/" + this.model['organizationId']);
    this.http.get<any>(environment.api + "organization/branch/" + this.model['organizationId'], {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        console.log(data);
        this.branch = data['data'];
      }
    );
  }

  fnSave() {
    const body = {
      id:  this.id ,
      model: this.model,
    };
    this.http.post<any>(environment.api + "employment/fnSave", body, {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        console.log(data);
        this.readonly = true;
      },
      e => {
        console.log(e);
      }
    )

  }

  back() {
    history.back();
  }



}

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
  selector: 'app-time-management-edit',
  templateUrl: './time-management-edit.component.html',
  styleUrls: ['./time-management-edit.component.css']
})
export class TimeManagementEditComponent implements OnInit {
  id: string = "";
  loading: boolean = false;
  model: any = new Model("", "", "", "", "");
  timeManagementShift: any = [];
  item: any = [];
  offtime: any = [];
  personal : any = [];
  constructor(
    private router: Router,
    private http: HttpClient,
    private configService: ConfigService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.httpGet();
  }

  httpGet() {
    this.loading = true;
    this.http.get<any>(environment.api + "timeManagement/today/" + this.activatedRoute.snapshot.params['id'], {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        this.personal = data['personal'];
        this.item = data['item'];
        this.offtime = data['offtime'];
        this.timeManagementShift = data['timeManagementShift']
     
        this.model['checkIn'] = data['item']['checkIn'];
        this.model['checkOut']= data['item']['checkOut'];
        this.model['shiftId']= data['item']['shiftId'];
        this.model['overTime']= data['item']['overTime'];
        this.model['offTimeId']= data['item']['offTimeId'];
        this.loading = false;
        console.log(data);

      });
  }

  back() {
    history.back();
  }

}

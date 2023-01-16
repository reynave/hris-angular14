import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';

export class Model {

  constructor(
    public name: string,
    public phone: string,
    public email: string,
    public gender: string,
    public birthPlace: string,
    public birthDate: any,
    public marital: string,
    public blood: string,
    public religion: string,
    public idType: number,
    public idNumber: string,
    public expDate: any,
    public permanent: boolean,
    public postalCode: string,
    public address: string,

  ) { }

}
@Component({
  selector: 'app-personal-detail',
  templateUrl: './personal-detail.component.html',
  styleUrls: ['./personal-detail.component.css']
})
export class PersonalDetailComponent implements OnInit {
  model: any = new Model("", "", "", "", "", "", "", "", "", 0, "", "", false, "", "");
  readonly: boolean = true;
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
    this.http.get<any>(environment.api + "personal/detail/" + this.activatedRoute.snapshot.params['id'], {
      headers: this.configService.headers(),
    }).subscribe(
      data => {

        let expDate = data['item'][0]['expDate'].split("-");
      let birthDate = data['item'][0]['birthDate'].split("-");

        console.log(data);
        this.model['name'] = data['item'][0]['name'];
        this.model['phone'] = data['item'][0]['phone'];
        this.model['email'] = data['item'][0]['email'];
        this.model['birthPlace'] = data['item'][0]['birthPlace'];
        this.model['birthDate'] = {
          year : parseInt(birthDate['0']),
          month : parseInt(birthDate['1']),
          day : parseInt(birthDate['2']),
        };
        this.model['gender'] = data['item'][0]['gender'];
        this.model['marital'] = data['item'][0]['marital'];
        this.model['blood'] = data['item'][0]['blood'];
        this.model['religion'] = data['item'][0]['religion'];
        this.model['idType'] = data['item'][0]['idType'];
        this.model['idNumber'] = data['item'][0]['idNumber'];
        this.model['expDate'] =  {
          year : parseInt(expDate['0']),
          month : parseInt(expDate['1']),
          day : parseInt(expDate['2']),
        };
        this.model['postalCode'] = data['item'][0]['postalCode'];
        this.model['address'] = data['item'][0]['address'];

        this.readonly = true;
      },
      e => {
        console.log(e);
      }
    )
  }


  fnDelete() {
    if (confirm("Delete this employed ?")) {
      const body = {
        id: this.activatedRoute.snapshot.params['id'],
      }
      this.http.post<any>(environment.api + "personal/fnDelete", body, {
        headers: this.configService.headers(),
      }).subscribe(
        data => {
          console.log(data);
          this.back();
        },
        e => {
          console.log(e);
        }
      )

    }
  }

  fnSave() {
    const body = {
      id : this.activatedRoute.snapshot.params['id'],
      model : this.model,
    };
    this.http.post<any>(environment.api + "personal/fnSave", body, {
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

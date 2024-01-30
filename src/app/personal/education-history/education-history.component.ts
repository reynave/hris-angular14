import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export class Educations {
  constructor(
    public id: number,
    public grade: string,
    public institution: string,
    public major: string,
    public startYear: string,
    public endYear: string,
    public gpa: string,
  ) { }
}

export class InformalEducations {
  constructor(
    public id: number,
    public name: string,
    public heldBy: string,
    public startYear: string,
    public endYear: string,
    public certificate: string,
    public fee: string,
  ) { }
}

export class Experience {
  constructor(
    public id: number,
    public company: string,
    public position: string,
    public startYear: any,
    public endYear: any, 
  ) { }
}
@Component({
  selector: 'app-education-history',
  templateUrl: './education-history.component.html',
  styleUrls: ['./education-history.component.css']
})
export class EducationHistoryComponent implements OnInit {
  model: any;
  educations: any;
  informalEducations: any;
  experience: any;

  selectGrade: any = [];
  selectRelationship: any = [];
  items: any = [];
  personal_education: any = [];
  personal_informal_education: any = [];
  personal_experience: any = [];

  itemsEC: any = [];

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private http: HttpClient,
    private configService: ConfigService,
    private activatedRoute: ActivatedRoute,
  ) { }
  newModel() {
    this.educations = new Educations(0, "", "", "", "", "", "");
    this.informalEducations = new InformalEducations(0, "", "", "", "", "", ""); 
    this.experience = new Experience(0, "", "", "", "",);  
  }
  ngOnInit(): void {
    this.newModel();
    this.httpDetail();
    this.httpGet(); 
  }
  httpGet() {
    this.http.get<any>(environment.api + "education/index/" + this.activatedRoute.snapshot.params['id'], {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        console.log(data);
        this.personal_education = data['personal_education'];
        this.personal_informal_education = data['personal_informal_education'];
        this.personal_experience = data['personal_experience']; 
      },
      error => {
        console.log(error);
      }
    )
  }

  httpDetail() {
    this.http.get<any>(environment.api + "education/detail/" + this.activatedRoute.snapshot.params['id'], {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        console.log(data);
        this.selectGrade = data['grade'];
        //        this.selectMaritalStatus = data['maritalStatus']; 
      },
      error => {
        console.log(error);
      }
    )
  }

  openEducation(content: any, x: any = false) {
    this.newModel();
    if (x != false) {
      this.educations.id = x.id;
      this.educations.grade = x.grade;
      this.educations.institution = x.institution;
      this.educations.major = x.major;
      this.educations.startYear = x.startYear;
      this.educations.endYear = x.endYear;
    }
    this.modalService.open(content, { size: 'lg' });
  } 
  onSubmitEducations() {

    const body = {
      personalId: this.activatedRoute.snapshot.params['id'],
      model: this.educations,
    }
    this.http.post<any>(environment.api + "education/onSubmitEducations", body, {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        console.log(data);
        this.httpGet();
        this.modalService.dismissAll();
      },
      e => {
        console.log(e);
      }
    )
  }
  fnDeleteEducation(x: any) {
    if (confirm("Delete this item")) {
      const body = {
        id: x.id,
      }
      this.http.post<any>(environment.api + "education/fnDeleteEducation", body, {
        headers: this.configService.headers(),
      }).subscribe(
        data => {
          this.httpGet();
        },
        e => {
          console.log(e);
        }
      )
    }
  }


  openInformalEducation(content: any, x: any = false) {
    this.newModel();
    console.log(x);
    if (x != false) {
      let startYear = x.startYear.split("-");
      let endYear = x.endYear.split("-");

      this.informalEducations.id = x.id;
      this.informalEducations.name = x.name;
      this.informalEducations.heldBy = x.heldBy;
  
      this.informalEducations.startYear= {
        year: parseInt(startYear['0']),
        month: parseInt(startYear['1']),
        day: parseInt(startYear['2']),
      };
      this.informalEducations.endYear= {
        year: parseInt(endYear['0']),
        month: parseInt(endYear['1']),
        day: parseInt(endYear['2']),
      };
 
      this.informalEducations.fee = x.fee;
      this.informalEducations.certificate =  x.certificate == '1' ? true : false;  
     
    }
    this.modalService.open(content, { size: 'lg' });
  }
  onSubmitInformalEducations() { 
    const body = {
      personalId: this.activatedRoute.snapshot.params['id'],
      model: this.informalEducations,
    }
    this.http.post<any>(environment.api + "education/onSubmitInformalEducations", body, {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        console.log(data);
        this.httpGet();
        this.modalService.dismissAll();
      },
      e => {
        console.log(e);
      }
    )
  }

  fnDeleteInformalEducation(x: any) {
    if (confirm("Delete this item")) {
      const body = {
        id: x.id,
      }
      this.http.post<any>(environment.api + "education/fnDeleteInformalEducation", body, {
        headers: this.configService.headers(),
      }).subscribe(
        data => {
          this.httpGet();
        },
        e => {
          console.log(e);
        }
      )
    }
  }


  openExperience(content: any, x: any = false) {
    this.newModel();
    console.log(x);
    if (x != false) {
      let startYear = x.startYear.split("-");
      let endYear = x.endYear.split("-");

      this.experience.id = x.id;
      this.experience.company = x.company;
      this.experience.position = x.position;
  
      this.experience.startYear= {
        year: parseInt(startYear['0']),
        month: parseInt(startYear['1']),
        day: parseInt(startYear['2']),
      };
      this.experience.endYear= {
        year: parseInt(endYear['0']),
        month: parseInt(endYear['1']),
        day: parseInt(endYear['2']),
      };  
    }
    this.modalService.open(content, { size: 'lg' });
  } 

  onSubmitExperience() { 
    const body = {
      personalId: this.activatedRoute.snapshot.params['id'],
      model: this.experience,
    }
    this.http.post<any>(environment.api + "education/onSubmitExperience", body, {
      headers: this.configService.headers(),
    }).subscribe(
      data => {
        console.log(data);
        this.httpGet();
        this.modalService.dismissAll();
      },
      e => {
        console.log(e);
      }
    )
  }
  fnDeleteExperience(x: any) {
    if (confirm("Delete this item")) {
      const body = {
        id: x.id,
      }
      this.http.post<any>(environment.api + "education/fnDeleteExperience", body, {
        headers: this.configService.headers(),
      }).subscribe(
        data => {
          this.httpGet();
        },
        e => {
          console.log(e);
        }
      )
    }
  }

}

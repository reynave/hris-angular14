import { HttpClient } from '@angular/common/http';
import { Component,   OnInit } from '@angular/core'; 
import { ConfigService } from '../service/config.service';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-sp',
  templateUrl: './sp.component.html',
  styleUrls: ['./sp.component.css']
})
export class SpComponent implements OnInit {
  items :any = [];
 
  constructor(
    private http: HttpClient,
    private configService: ConfigService, 
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.httpGet();
  }

  httpGet(){
    this.http.get<any>(environment.api+"sp/index",{
      headers:this.configService.headers(),
    }).subscribe(
      data=>{
        console.log(data);
        this.items = data['items']
      },
      error=>{
        console.log(error);
      },
    )
  } 
}

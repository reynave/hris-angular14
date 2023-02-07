import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-history-loan-log',
  templateUrl: './home-history-loan-log.component.html',
  styleUrls: ['./home-history-loan-log.component.css']
})
export class HomeHistoryLoanLogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  back(){
    history.back();
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-invetory-detail-personal',
  templateUrl: './invetory-detail-personal.component.html',
  styleUrls: ['./invetory-detail-personal.component.css']
})
export class InvetoryDetailPersonalComponent implements OnInit {
  @Input() id: any;

	constructor(public activeModal: NgbActiveModal) {}

  ngOnInit()  {
  }

}

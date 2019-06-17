import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation-summary',
  templateUrl: './reservation-summary.component.html',
  styleUrls: ['./reservation-summary.component.scss']
})
export class ReservationSummaryComponent implements OnInit {

  constructor() {
    document.body.scrollTop = 0;
  }

  ngOnInit() {
  }

}

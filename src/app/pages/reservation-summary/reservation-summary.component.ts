import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation-summary',
  templateUrl: './reservation-summary.component.html',
  styleUrls: ['./reservation-summary.component.scss']
})
export class ReservationSummaryComponent implements OnInit {

  constructor() {
    window.scrollTo({
      top: 0,
      left: 0,
    });
   }

  ngOnInit() {
  }

}

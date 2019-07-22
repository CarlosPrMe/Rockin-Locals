import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation-summary',
  templateUrl: './reservation-summary.component.html',
  styleUrls: ['./reservation-summary.component.scss']
})
export class ReservationSummaryComponent implements OnInit {

  constructor() {
<<<<<<< HEAD
    document.body.scrollTop = 0;
  }
=======
    window.scrollTo({
      top: 0,
      left: 0,
    });
   }
>>>>>>> 11a671b5fa87856b770498d61a8c79ae823e5ff4

  ngOnInit() {
  }

}

import { Component, OnInit, OnChanges } from '@angular/core';
import { Reservation } from 'src/app/mis clases/reservation';
import { ReservationsService } from 'src/app/services/reservations.service';

@Component({
  selector: 'app-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.scss']
})
export class PaymentSummaryComponent implements OnInit, OnChanges {

<<<<<<< HEAD
  constructor() {
    document.body.scrollTop = 0;
=======
  reservation;

  constructor(private reservationService : ReservationsService) {
    window.scrollTo({
      top: 0,
      left: 0,
    });
>>>>>>> 11a671b5fa87856b770498d61a8c79ae823e5ff4
  }

  ngOnInit() {

  this.reservation = this.reservationService.currentReservation.value;
  }
  ngOnChanges() {

  }
}

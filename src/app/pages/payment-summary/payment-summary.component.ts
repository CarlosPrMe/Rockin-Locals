import { Component, OnInit, OnChanges } from '@angular/core';
import { Reservation } from 'src/app/mis clases/reservation';
import { ReservationsService } from 'src/app/services/reservations.service';

@Component({
  selector: 'app-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.scss']
})
export class PaymentSummaryComponent implements OnInit, OnChanges {

  reservation;

  constructor(private reservationService : ReservationsService) {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }

  ngOnInit() {

  this.reservation = this.reservationService.currentReservation.value;
  }
  ngOnChanges() {

  }
}

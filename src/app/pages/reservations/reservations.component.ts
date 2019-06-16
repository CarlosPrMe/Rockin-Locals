import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { LoggingService } from '../../services/logging.service';
import { GetReservationsService } from '../../services/getReservations.service';


@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit, OnChanges {


  user;
  reservations: Array<any> = [];
  reservationsPast: Array<any> = [];
  reservationsNext: Array<any> = [];
  date = Date.now();
  //localSelected = this.getLocalsService.localSelected

  constructor(private loggingService: LoggingService,
    private getReservationsService: GetReservationsService) {

    this.loggingService.user.subscribe((res) => {
      this.user = res;
    })

    this.getReservationsService.getReservation(this.user.bandName).then((data: Array<any>) => {
      this.reservations = data;
      console.log(this.reservations);
      this.separateReservations.call(this, data);
    })

  }


  ngOnInit() {


  }

  ngOnChanges() {

  }


  separateReservations(arrayReser) {
    arrayReser.forEach(reserva => {
      if (reserva.date > this.date) {
        this.reservationsNext.push(reserva)
      } else {
        this.reservationsPast.push(reserva)
      }
    });

  }


}

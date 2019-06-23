import { Component, OnInit } from '@angular/core';
import { LoggingService } from '../../services/logging.service';
import { ReservationsService } from '../../services/reservations.service';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { LocalsService } from '../../services/locals.service';


@Component({
  selector: 'app-my-locals',
  templateUrl: './my-locals.component.html',
  styleUrls: ['./my-locals.component.scss']
})
export class MyLocalsComponent implements OnInit {

  user;
  reservations: Array<any> = [];
  reservationsPast: Array<any> = [];
  reservationsNext: Array<any> = [];
  today: NgbDate;
  local;
  showTableReservations:boolean = true;
  constructor(private loggingService: LoggingService,
    private reservationsService: ReservationsService,
    private localsService: LocalsService,
    private ngbCalendar: NgbCalendar) {

    document.body.scrollTop = 0;

    this.today = this.ngbCalendar.getToday();

    this.loggingService.user.subscribe((res) => this.user = res);

    this.reservationsService.getReservation(this.user.companyName).then((data: Array<any>) => {
      this.reservations = data;
      this.separateReservations.call(this, data);
    })

    this.localsService.getLocalsByLocal(this.user.companyName).then(data => {
      this.local = data[0];
    })


  }

  ngOnInit() {
  }

  separateReservations(arrayReser) {
    arrayReser.forEach(reserva => {
      if (this.today.before(reserva.date)) {
        this.reservationsNext.push(reserva)
      } else if (this.today.after(reserva.date)) {
        this.reservationsPast.push(reserva)
      }
    });
  }

}

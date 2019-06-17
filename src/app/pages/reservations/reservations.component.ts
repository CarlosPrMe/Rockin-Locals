import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { LoggingService } from '../../services/logging.service';
import { GetReservationsService } from '../../services/getReservations.service';
import { browser } from 'protractor';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { window } from 'rxjs/operators';


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
  today = this.ngCalendar.getToday();
  //localSelected = this.getLocalsService.localSelected

  constructor(private loggingService: LoggingService,
    private getReservationsService: GetReservationsService,
    private ngCalendar: NgbCalendar) {

    this.loggingService.user.subscribe((res) => {
      this.user = res;
    })

    this.getReservationsService.getReservation(this.user.bandName).then((data: any) => {
      this.reservations = data
      this.separateReservations.call(this, data);
    })

    document.body.scrollTop = 0;
  }


  ngOnInit() { }

  ngOnChanges() { }

  separateReservations(arrayReser) {
    arrayReser.forEach(res => {
      if (this.today.before(res.date)) {
        this.reservationsNext.push(res)
      } else if (this.today.after(res.date)) {
        this.reservationsPast.push(res)
      }
    });
  }

}

import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { LoggingService } from '../../services/logging.service';
import { ReservationsService } from '../../services/reservations.service';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { LocalsService } from '../../services/locals.service';
import { Router } from '@angular/router';
import { FavouritesService } from '../../services/favourites.service';


@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit, OnChanges {


  user;
  userDate;
  reservations: Array<any> = [];
  reservationsPast: Array<any> = [];
  reservationsNext: Array<any> = [];
  //date = Date.now();
  today: NgbDate;

  nada;


  constructor(private loggingService: LoggingService,
    private reservationsService: ReservationsService, private ngbCalendar: NgbCalendar,
    private localsService: LocalsService, private router: Router,
    private favourites : FavouritesService) {
    document.body.scrollTop = 0

    this.loggingService.user.subscribe((res) => {
      this.user = res;
    })

    this.today = this.ngbCalendar.getToday();

    this.reservationsService.getReservation(this.user.bandName).then((data: Array<any>) => {
      this.reservations = data;
      console.log(this.reservations);
      debugger
      this.separateReservations.call(this, data);
    })

    console.log(this.reservationsNext);

  }


  ngOnInit() { }

  ngOnChanges() { }


  separateReservations(arrayReser) {
    arrayReser.forEach(reserva => {
      if (this.today.before(reserva.date)) {
        this.reservationsNext.push(reserva)
      } else if (this.today.after(reserva.date)) {
        this.reservationsPast.push(reserva)
      }
    });
  }

  async onNavigateTolocal(id) {
    //console.log(id);
    this.localsService.localSelected = await this.localsService.getLocalsById(id)
    this.router.navigateByUrl(`/local/${id}`)

  }

  onDeleteFavourite(id){
    console.log('id del local a borrar',id);
    this.favourites.deleteFavourite(id, this.user.id).then(res=>{});

  }

}

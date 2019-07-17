import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ReservationsService } from '../../services/reservations.service';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { LocalsService } from '../../services/locals.service';
import { Router } from '@angular/router';
import { FavouritesService } from '../../services/favourites.service';
import swal from 'sweetalert2';


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
  //date = Date.now();
  today: NgbDate;
  todayJs: Number = Date.now();

  constructor(private loginService: LoginService,
    private reservationsService: ReservationsService, private ngbCalendar: NgbCalendar,
    private localsService: LocalsService, private router: Router,
    private favourites: FavouritesService) {
    window.scrollTo({
      top: 0,
      left: 0,
    });

    this.loginService.user.subscribe((res) => {
      this.user = res;
    })

    this.today = this.ngbCalendar.getToday();

    this.reservations = [];

    /*     this.reservationsService.getReservationByBand(this.user.bandName).then((data: Array<any>) => {
          this.reservations = data;
          console.log(this.reservations);
          this.separateReservations.call(this, data);
        }) */
    debugger
    this.reservationsService.getReservationByBand(this.user._id).then((data: Array<any>) => {
      debugger
      this.reservations = data;
      console.log(this.reservations);
      this.separateReservations.call(this, data);
    })

    console.log(this.reservationsNext);

  }


  ngOnInit() { }

  ngOnChanges() { }


  separateReservations(arrayReser) {
    arrayReser.forEach(reserva => {
      if (this.today.before(reserva.date) || this.today.equals(reserva.date)) {
        debugger
        this.reservationsNext.push(reserva)
      } else if (this.today.after(reserva.date)) {
        debugger
        this.reservationsPast.push(reserva)
      }
    });
  }

  /*   separateReservations(arrayReser) {
      arrayReser.forEach(reserva => {
        if (this.todayJs < reserva.moment) {
          this.reservationsNext.push(reserva)
        } else {
          this.reservationsPast.push(reserva)
        }
      });
    } */

  async onNavigateTolocal(id) {

    //console.log(id);
    this.localsService.localSelected = await this.localsService.getLocalsById(id)
    this.router.navigateByUrl(`/local/${id}`)

  }

  onDeleteFavourite(id) {
    let currentUser = { ...this.user };
    debugger
    this.favourites.deleteFavourite(this.user, id).catch((err) => {
      debugger
      if (err) {
        this.loginService.user.next(currentUser);
        this.router.navigate(['/index']);
        return swal.fire({
          title: '¡Error al editar favoritos!',
          type: "error",
          showConfirmButton: false,
        })
      }
    }).then((res: any) => {
      debugger
      if (res.data) {
        this.loginService.user.next(res.data)
      }
    });

  }

  async onCancelReservation(idReserToDelete) {
    let reservation: Array<any> = this.reservationsNext.filter(res => res._id === idReserToDelete);

    console.log(reservation[0]);

    let response = await swal.fire({
      title: '¿Está seguro de cancelar la reserva?',
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#119e32',
      cancelButtonColor: '#be1e1e',
      confirmButtonText: 'Confirmar cancelación',
      cancelButtonText: 'Atrás'
    })

    if (response.value) {
      debugger
      console.log(reservation[0]);
      let cancelation: any = await this.reservationsService.deleteAvailability(reservation[0]);
      debugger
      if (cancelation.ok === 1) {
        debugger
        this.reservationsService.deleteReservation(idReserToDelete).catch((err) => {
          debugger
          if (err) {
            this.router.navigate(['/index']);
            return swal.fire({
              title: '¡Error al cancelar la reserva!',
              text: 'Intentelo de nuevo más tarde',
              type: "error",
              showConfirmButton: false,
            })
          }
        }).then((res:any) => {
          debugger
          if(res.ok === 1){
            this.router.navigate(['/index']);
            return swal.fire({
              title: '¡Reserva Cancelada con éxito!',
              text: 'El dinero será abonado mediante el mismo metódo de pago con el que se hizo la reserva',
              type: 'success',
              showConfirmButton: false,
            })
          }
        })

      } else {
        debugger
        this.router.navigate(['/index']);
        return swal.fire({
          title: '¡Error al cancelar la reserva!',
          text: 'Intentelo de nuevo más tarde',
          type: "error",
          showConfirmButton: false,
        })
      }

    } else {
      debugger
      this.router.navigate(['/index']);
      return swal.fire({
        title: '¡Error al editar favoritos!',
        type: "error",
        showConfirmButton: false,
      })

    }

  }

}

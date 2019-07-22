import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ReservationsService } from '../../services/reservations.service';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { LocalsService } from '../../services/locals.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { ScreenService } from '../../services/screen.service';
import { MatDialog } from '@angular/material';
import { ModalDetailComponent } from '../../shared/modal-detail/modal-detail.component';



@Component({
  selector: 'app-my-locals',
  templateUrl: './my-locals.component.html',
  styleUrls: ['./my-locals.component.scss']
})
export class MyLocalsComponent implements OnInit, OnDestroy {

  user;
  reservations: Array<any> = [];
  reservationsPast: Array<any> = [];
  reservationsNext: Array<any> = [];
  today: NgbDate;
  local;
  showTableReservations: boolean = true;
  reservationDetail: Array<any> = [];
  constructor(private loginService: LoginService,
    private reservationsService: ReservationsService,
    private localsService: LocalsService,
    private ngbCalendar: NgbCalendar, public dialog: MatDialog,
    private router: Router, private screen: ScreenService) {

    window.scrollTo({
      top: 0,
      left: 0,
    });

    this.loginService.user.subscribe((res) => this.user = res);
    this.today = this.ngbCalendar.getToday();
    this.reservations = [];



    this.reservationsService.getReservationByLocal(this.user._id).then((data: Array<any>) => {

      this.reservations = data;
      this.separateReservations.call(this, data);
    })

    this.localsService.getLocalsByLocal(this.user._id).then(data => {
      this.local = data[0];
    })

<<<<<<< HEAD
    this.loggingService.user.subscribe((res) => this.user = res)
    document.body.scrollTop = 0;
=======
>>>>>>> 11a671b5fa87856b770498d61a8c79ae823e5ff4
  }

  ngOnInit() {
    this.user

  }

  ngOnDestroy() {
  }

  separateReservations(arrayReser) {
    arrayReser.forEach(reserva => {
      if (this.today.before(reserva.date) || this.today.equals(reserva.date)) {
        this.reservationsNext.push(reserva)
      } else if (this.today.after(reserva.date)) {
        this.reservationsPast.push(reserva)
      }
    });
  }

  async onUpdateLocal(local) {

    if (local._id) {
      let localToEdit: any = await this.localsService.editLocal(local)
      if (!localToEdit) {
        this.router.navigate(['/index']);
        return swal.fire({
          title: '¡Error al hacer los cambios!',
          type: "error",
          showConfirmButton: false,
        })
      } else {

        this.router.navigateByUrl('/index');
        this.local = null
        return swal.fire({
          title: 'Local Editado',
          type: "success",
          showConfirmButton: false,
        });
      }
    } else {

      let newLocal: any = await this.localsService.createLocal(local);

      if (!newLocal) {

        this.router.navigateByUrl('/index');
        return swal.fire({
          title: '¡Error al añadir el local!',
          type: "error",
          showConfirmButton: false,
        })
      } if (newLocal._id) {

        this.local = null
        this.router.navigateByUrl('/index');
        return swal.fire({
          title: 'Local añadido',
          type: "success",
          showConfirmButton: false,
        });
      }
    }
  }

  onDeleteLocal(id) {

    swal.fire({
      title: '¿Estás seguro de eliminar el local?',
      text: 'Se perderá toda la información',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#119e32',
      cancelButtonColor: '#be1e1e',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.value) {

        this.localsService.deleteLocal(id).catch(err => {

          if (err) {
            this.router.navigate(['/index']);
            return swal.fire({
              title: '¡Error al editar el local!',
              type: "error",
              showConfirmButton: false,
            })
          }
        }).then((res: any) => {

          if (res.ok === 1) {
            swal.fire({
              title: '¡Eliminado!',
              text: 'Tu local ha sido eliminado con éxito',
              type: 'success',
              timer: 2000,
              showConfirmButton: false,
            })
            this.local = null;
            this.router.navigate(['/index']);
          }
        })
      }
    })
  }

  onDetailReservation(id) {

    if (this.screen.resolution.value > 1023) {
      this.reservationDetail = this.reservations.filter(res => res._id === id)
      this.dialog.open(ModalDetailComponent, {
        data: this.reservationDetail
      });

    }

  }
}

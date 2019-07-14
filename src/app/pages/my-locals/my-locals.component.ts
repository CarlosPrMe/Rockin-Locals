import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ReservationsService } from '../../services/reservations.service';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { LocalsService } from '../../services/locals.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';


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
  showTableReservations: boolean = true;
  constructor(private loginService: LoginService,
    private reservationsService: ReservationsService,
    private localsService: LocalsService,
    private ngbCalendar: NgbCalendar,
    private router: Router) {

    window.scrollTo({
      top: 0,
      left: 0,
    });

    this.today = this.ngbCalendar.getToday();

    this.loginService.user.subscribe((res) => this.user = res);


    this.reservationsService.getReservationByLocal(this.user.companyName).then((data: Array<any>) => {
      this.reservations = data;
      this.separateReservations.call(this, data);
    })

    this.localsService.getLocalsByLocal(this.user.companyName).then(data => {
      this.local = data[0];

    })

  }

  ngOnInit() {
    this.user

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

  async onUpdateLocal(local) {
    debugger
    if (local._id) {
      debugger
      let localToEdit: any = await this.localsService.editLocal(local)
      debugger
      if (!localToEdit) {
        debugger
        this.router.navigate(['/index']);
        return swal.fire({
          title: '¡Error al hacer los cambios!',
          type: "error",
          showConfirmButton: false,
        })
      } else {
        debugger
        this.router.navigateByUrl('/index');
        this.local = null //No entiendo por que
        return swal.fire({
          title: 'Local Editado',
          type: "success",
          showConfirmButton: false,
        });
      }
    } else {
      debugger
      let newLocal: any = await this.localsService.createLocal(local);
      debugger
      if (!newLocal) {
        debugger
        this.router.navigateByUrl('/index');
        return swal.fire({
          title: '¡Error al añadir el local!',
          type: "error",
          showConfirmButton: false,
        })
      } if (newLocal._id) {
        debugger
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
        debugger
        this.localsService.deleteLocal(id).then((res: any) => {
          debugger
          if (res.ok === 1) {
            swal.fire({
              title: '¡Eliminado!',
              text: 'Tu local ha sido eliminado con éxito',
              type: 'success',
              timer: 2000,
              showConfirmButton: false,
            })
          }
          this.local = null;
          this.router.navigate(['/index']);
        })
      }
    })
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LocalsService } from '../../../services/locals.service';
import { customValidatorEmail } from '../../modal/validators-custom';
import { Router } from '@angular/router';
import { ReservationsService } from '../../../services/reservations.service';
import swal from 'sweetalert2';
import { log } from 'util';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  myForm;
  @Input() reservation;
  localSelected;
  methodActive: boolean = false;


  constructor(private fb: FormBuilder, private localservice: LocalsService,
    private reservationService: ReservationsService,
    private router: Router) {
    this.localSelected = this.localservice.localSelected
    console.log(this.reservationService.hoursAvailable.value);
    console.log(this.reservation)

  }

  ngOnInit() {
    this.myForm = this.fb.group({
      method: ["", Validators.required],
      creditNumber: [""],
      expireDate: [""],
      cvvCode: [""],

    })
  }

  submit($event, form) {
    console.log(form.value);


    this.reservation.methodPayment = form.value;
    console.log(this.reservation);
    debugger
    this.reservationService.makeReservation(this.reservation).then((res) => {
      //console.log(res)
    })

    if (this.reservationService.emptyDay.value) {
      //Crear una disponibiliad
      this.reservationService.startAvailability(this.reservation.date, this.reservation.companyName, this.reservation.localName, this.reservationService.hoursAvailable.value).then((res) => { })
      debugger
    } else {
      //Modificamos la disponibiliadad
      this.reservationService.modifyAvailability(this.reservation.date, this.reservation.companyName, this.reservation.localName, this.reservationService.hoursAvailable.value).then((res) => { })
      debugger
    }
    this.reservationService.emptyDay.next(false);


    swal.fire({
      title: 'Gracias por la reserva',
      text: `${this.reservation.companyName} te espera el ${this.reservation.date.day} / ${this.reservation.date.month} / ${this.reservation.date.year} en ${this.reservation.localName} a las ${this.reservation.hours[0]} `,
      type: "success",
      showConfirmButton: false,
    });

    this.router.navigateByUrl('/index');
  }

  activateMethod($event) {
    this.methodActive = true;
    //console.log(this.methodActive);

  }
}

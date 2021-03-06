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
    this.reservation.methodPayment = form.value;
    this.reservationService.makeReservation(this.reservation).then((res) => {
    })

    if (this.reservationService.emptyDay.value) {
      this.reservationService.startAvailability(this.reservation.date, this.reservation.companyName, this.reservation.companyId, this.reservation.localName, this.reservationService.hoursAvailable.value).then((res) => { })

    } else {
      this.reservationService.modifyAvailability(this.reservation.date, this.reservation.companyName, this.reservation.companyId, this.reservation.localName, this.reservationService.hoursAvailable.value).then((res) => { })

    }
    this.reservationService.emptyDay.next(false);


    swal.fire({
      title: 'Gracias por la reserva',
      text: `${this.reservation.companyName} te espera el ${this.reservation.date.day} / ${this.reservation.date.month} / ${this.reservation.date.year} en ${this.reservation.localName} a las ${this.reservation.hours[0]} `,
      type: "success",
      showConfirmButton: false,
    });
    this.router.navigateByUrl('/reservations');
  }

  activateMethod($event) {
    this.methodActive = true;
  }
}

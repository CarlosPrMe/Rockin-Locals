import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LocalsService } from '../../../services/locals.service';
import { customValidatorEmail } from '../../modal/validators-custom';
import { Router } from '@angular/router';
import { ReservationsService } from '../../../services/reservations.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  myForm;
  @Input() reservation;
  localSelected;
  //methodSelected:boolean;
  methodActive: boolean = false


  constructor(private fb: FormBuilder, private localservice: LocalsService,
    private reservationService: ReservationsService,
    private router: Router) {
    this.localSelected = this.localservice.localSelected
    console.log(this.localservice.localSelected);
    console.log(this.localSelected);
    console.log(this.methodActive);

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
    this.reservationService.makeReservation(this.reservation).then((res)=>{
      console.log(res)
    })

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
    console.log(this.methodActive);

  }
}

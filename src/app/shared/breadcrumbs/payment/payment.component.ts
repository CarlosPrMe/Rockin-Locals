import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  myForm;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      method: [""],
      creditNumber: [""],
      expireDate: [""],
      cvvCode: [""],

    })
  }

  submit($event, form) {
    console.log(form.value);

  }
}

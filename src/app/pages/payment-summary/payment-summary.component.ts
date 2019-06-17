import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.scss']
})
export class PaymentSummaryComponent implements OnInit, OnChanges {

  constructor() {
    document.body.scrollTop = 0;
  }

  ngOnInit() {
  }
  ngOnChanges() {

  }
}

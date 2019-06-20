import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}



/* <mat-progress-spinner
class="example-margin"
[color]="color"
[mode]="mode"
[value]="value">
</mat-progress-spinner> */

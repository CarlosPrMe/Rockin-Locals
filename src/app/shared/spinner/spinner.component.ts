import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';


@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnChanges {

  @Input() loading;


  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(simplechange: SimpleChanges) {

  }


}



/* <mat-progress-spinner
class="example-margin"
[color]="color"
[mode]="mode"
[value]="value">
</mat-progress-spinner> */

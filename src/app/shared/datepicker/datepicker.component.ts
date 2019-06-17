import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbCalendar, NgbDate, NgbPeriod } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],

})
export class DatepickerComponent implements OnInit {

  constructor(private ngCalendar: NgbCalendar) { }

  ngOnInit() {

  }

  @Output() date = new EventEmitter();



  displayMonths = 2;
  navigation = 'arrows';
  showWeekNumbers = false;
  outsideDays = 'hidden';
  minDate = this.ngCalendar.getToday();
  startDate = this.ngCalendar.getToday();
  maxDate = this.ngCalendar.getNext(this.startDate, 'm', 3);


  onDateSelect(day) {
     console.log(day);
     this.date.emit(day);
  }



}

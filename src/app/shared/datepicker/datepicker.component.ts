import { Component, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { NgbCalendar, NgbDate, NgbPeriod } from '@ng-bootstrap/ng-bootstrap';
import { ScreenService } from '../../services/screen.service';


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],

})
export class DatepickerComponent implements OnInit, OnChanges {

  resolution;
  displayMonths;
  constructor(private ngCalendar: NgbCalendar, private screenService: ScreenService) {
    this.resolution = this.screenService.resolution.subscribe(res => {
      //console.log(res);
      if (res < 550) {
        this.displayMonths = 1;
      } else {
        this.displayMonths = 2;
      }

    })
  }



  ngOnInit() { }

  ngOnChanges() {

  }

  @Output() date = new EventEmitter();


  navigation = 'arrows';
  showWeekNumbers = false;
  outsideDays = 'hidden';
  minDate = this.ngCalendar.getToday();
  startDate = this.ngCalendar.getToday();
  maxDate = this.ngCalendar.getNext(this.startDate, 'm', 3);


  onDateSelect(day) {
    //console.log(day);
    this.date.emit(day);

  }



}

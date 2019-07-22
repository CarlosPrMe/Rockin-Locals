import { Component, OnInit, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { NgbCalendar, NgbDate, NgbPeriod } from '@ng-bootstrap/ng-bootstrap';
import { ScreenService } from '../../services/screen.service';


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],

})
export class DatepickerComponent implements OnInit, OnChanges, OnDestroy {

  resolution;
  displayMonths;
  constructor(private ngCalendar: NgbCalendar, private screenService: ScreenService) {
    this.resolution = this.screenService.resolution.subscribe(res => {

      if (res < 550) {
        this.displayMonths = 1;
      } else {
        this.displayMonths = 2;
      }

    })
  }


  ngOnInit() { }

  ngOnChanges() { }

ngOnDestroy(){}

  @Output() date = new EventEmitter();


  navigation = 'arrows';
  showWeekNumbers = false;
  outsideDays = 'hidden';
  minDate = this.ngCalendar.getToday();
  startDate = this.ngCalendar.getToday();
  maxDate = this.ngCalendar.getNext(this.startDate, 'm', 3);


  onDateSelect(day) {
    this.date.emit(day);
    this.moveScreen();
  }


  moveScreen() {
    if (this.screenService.resolution.value > 1024) {
      window.scrollTo({
        top: 690,
        left: 0,
        behavior:'smooth'
      })
    }
    else if (this.screenService.resolution.value < 1023 && this.screenService.resolution.value >= 768) {
      window.scrollTo({
        top: 860,
        left: 0,
        behavior:'smooth'
      });
    }
  }


}


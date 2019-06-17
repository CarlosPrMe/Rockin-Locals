import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AddtoFavouritesService } from '../../services/add-favourites.service';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-local-info',
  templateUrl: './local-info.component.html',
  styleUrls: ['./local-info.component.scss']
})
export class LocalInfoComponent implements OnInit {


  showBooking: boolean = false;
  @Input() localSelected;
  @Input() user;
  @Input() userData;
  daySelected;
  //currentMonth;
  monthList: Array<string> = []


  constructor(private addtoFavouritesService: AddtoFavouritesService, private ngCalendar: NgbCalendar) {

   // this.currentMonth = this.ngCalendar.getToday();
   // console.log('this.currentMonth', this.currentMonth);

  }

  ngOnInit() {
  }


  booking($event) {
    this.showBooking = !this.showBooking;

  }

  addToFavourites(user, local) {
    this.addtoFavouritesService.addFavourite(user, local).then((data) => console.log(data))

  }

  getDay(day) {
    this.daySelected = day
    console.log(day);

  }

  //this.
  //console.log(this.localSelected, this.user);


}

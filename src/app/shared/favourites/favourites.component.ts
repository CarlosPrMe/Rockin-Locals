import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalsService } from '../../services/locals.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  constructor(private localService: LocalsService) { }

  showList: boolean;
  @Output() navigateTolocal = new EventEmitter();

  @Input() user;

  ngOnInit() {
  }

  showFavourites($event) {
    this.showList = !this.showList;
  }

  async  goToLocal($event, id) {
    this.navigateTolocal.emit(id);
  }
}

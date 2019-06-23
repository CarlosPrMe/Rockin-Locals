import { Component, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-btn-favourites-delete',
  templateUrl: './btn-favourites-delete.component.html',
  styleUrls: ['./btn-favourites-delete.component.scss']
})

export class BtnFavouritesDeleteComponent {
@Output() deleteFavourite = new EventEmitter


  delete($event){
    this.deleteFavourite.emit($event);
  }
 }

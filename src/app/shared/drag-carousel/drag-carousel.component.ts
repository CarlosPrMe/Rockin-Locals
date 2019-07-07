import { Component, OnInit, ViewChild } from '@angular/core';
import { DragScrollComponent } from 'ngx-drag-scroll';
//import { setInterval } from 'timers';

@Component({
  selector: 'app-drag-carousel',
  templateUrl: './drag-carousel.component.html',
  styleUrls: ['./drag-carousel.component.scss']
})
export class DragCarouselComponent implements OnInit {

  constructor() { }
  leftNavDisabled: boolean;
  rightNavDisabled: boolean;
  nada
  ngOnInit() {
  }

  @ViewChild('nav', { read: DragScrollComponent })

  ds: DragScrollComponent;

  moveLeft() {
    this.ds.moveLeft();
  }

  moveRight() {
    this.ds.moveRight();
  }

  moveTo(index) {
    this.ds.moveTo(index);
  }

  ngAfterViewInit() {
    // Starting ngx-drag-scroll from specified index(3)
    setTimeout(() => {
      //this.ds.moveTo(-1);
    }, 0);

    this.autoMovement(this.leftNavDisabled, this.rightNavDisabled)
  }

  leftBoundStat(reachesLeftBound: boolean) {
    this.leftNavDisabled = reachesLeftBound;
    //console.log(reachesLeftBound);

  }

  rightBoundStat(reachesRightBound: boolean) {
    //this.rightNavDisabled = reachesRightBound;
    //console.log(reachesRightBound);

  }
  onIndexChanged(idx) {
    //this.index = idx;
    //console.log('current index: ' + idx);
  }


  autoMovement(reachesLeftBound: boolean, reachesRightBound: boolean) {

/*     while (!reachesLeftBound) {
      setInterval(() => {
        this.ds.moveRight();
      }, 4000);
    }

    while (!reachesRightBound) {
      setInterval(() => {
        this.ds.moveRight();
      }, 4000);
    } */


  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { DragScrollComponent } from 'ngx-drag-scroll';

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
    this.autoMovement(this.leftNavDisabled, this.rightNavDisabled)
  }

  leftBoundStat(reachesLeftBound: boolean) {
    this.leftNavDisabled = reachesLeftBound;
  }

  rightBoundStat(reachesRightBound: boolean) {
  }
  onIndexChanged(idx) {
  }


  autoMovement(reachesLeftBound: boolean, reachesRightBound: boolean) {

  }
}

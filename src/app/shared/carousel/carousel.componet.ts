/* import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.componet.html',
  styleUrls: ['./carousel.componet.scss']
})
export class CarouselComponent { } */


import {Component} from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.componet.html',
  styleUrls: ['./carousel.componet.scss'],
  providers: [NgbCarouselConfig]
})

export class CarouselComponent  {
  images = [1, 2, 3, 4].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }
}

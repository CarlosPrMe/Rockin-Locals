import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class ScreenService {

  resolution = new BehaviorSubject(window.screen.width);
  heigth = new BehaviorSubject(window.scrollY);

  constructor() {
    window.addEventListener('scroll', (e) => this.heigth.next(window.scrollY));
    window.addEventListener('resize', (e) => this.resolution.next(window.screen.width));



  }

}

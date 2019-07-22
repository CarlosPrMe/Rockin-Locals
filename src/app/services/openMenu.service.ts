import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class OpenMenuService {
  showMenuBehavior = new BehaviorSubject(false);
  constructor() {
  }

  changeMenuStatus(): boolean {

    if (this.showMenuBehavior.value === true) {
      this.showMenuBehavior.next(false)
      return this.showMenuBehavior.value
    } else if (this.showMenuBehavior.value === false) {
      this.showMenuBehavior.next(true)
      return this.showMenuBehavior.value
    }

  }
}

import { Injectable } from '@angular/core';

@Injectable()

export class OpenMenuService {

  constructor() { }

  trigger: boolean;

  openMenu(even) {
    console.log(this.trigger);
    return this.trigger = !this.trigger

  }


}

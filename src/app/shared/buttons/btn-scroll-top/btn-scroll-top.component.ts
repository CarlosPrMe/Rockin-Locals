import { Component, OnChanges, Output, EventEmitter, SimpleChange, OnDestroy } from '@angular/core';
import { ScreenService } from '../../../services/screen.service';


@Component({
  selector: 'app-btn-scroll-top',
  templateUrl: './btn-scroll-top.component.html',
  styleUrls: ['./btn-scroll-top.component.scss']
})

export class BtnScrollTopComponent implements OnDestroy {

  heigth;
  show:boolean;
  @Output() doScroll = new EventEmitter();

  constructor(private screnService: ScreenService) {
    this.screnService.heigth.subscribe((res) => {this.heigth = res;

      if (this.heigth > 500) {
        this.show = true
      } else if (this.heigth < 500) {
        this.show = false
      }

    })

  }

ngOnDestroy(){

}

  scrollTop(event) {
    this.doScroll.emit(event)
  }

}


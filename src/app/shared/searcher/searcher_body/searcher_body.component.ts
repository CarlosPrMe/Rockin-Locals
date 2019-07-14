import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ScreenService } from '../../../services/screen.service';


@Component({
  selector: 'app-searcher-body',
  templateUrl: './searcher_body.component.html',
  styleUrls: ['./searcher_body.component.scss']
})

export class SearcherBodyComponent implements OnChanges {

  @Input() showInfo;
  @Input() localsFound;
  @Input() loading;
  @Input() scroll;



  constructor(private screen: ScreenService) { }


  ngOnChanges(change: SimpleChanges) {
    if (this.localsFound) {
      if (this.screen.resolution.value > 1024) {
        window.scrollTo({
          top: 500,
          left: 0,
          behavior: 'smooth'
        });
      }
      if (this.screen.resolution.value < 1023 && this.screen.resolution.value > 767) {
        window.scrollTo({
          top: 500,
          left: 0,
          behavior: 'smooth'
        });
      }
      if (this.screen.resolution.value < 767) {

        window.scrollTo({
          top: 375,
          left: 0,
          behavior: 'smooth'
        });
      }
    }
  }
}

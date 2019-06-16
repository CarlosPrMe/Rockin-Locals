import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { TestService } from '../../../services/test.service';

@Component({
  selector: 'app-searcher-body',
  templateUrl: './searcher_body.component.html',
  styleUrls: ['./searcher_body.component.scss']
})

export class SearcherBodyComponent {

  @Input() showInfo;

  @Input() localsFound;

  constructor() { }

  /*   ngOnChanges( change : SimpleChanges) {
      this.localsFound = this.testService.localsBySearch;
    } */
}

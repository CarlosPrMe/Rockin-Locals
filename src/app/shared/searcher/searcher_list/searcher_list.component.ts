import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { LocalsService } from '../../../services/locals.service';



@Component({
  selector: 'app-searcher-list',
  templateUrl: './searcher_list.component.html',
  styleUrls: ['./searcher_list.component.scss']
})

export class SearcherListComponent {

  constructor(private localsService: LocalsService) { }


  @Input() localsFound;
  @Input() showInfo;
  @Output() localSelected = new EventEmitter();


  goToLocal($event, local) {
    this.localsService.selectLocal(local);
  }

}

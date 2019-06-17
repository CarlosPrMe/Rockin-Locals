import { Component, Input } from '@angular/core';
import { TableGridComponent } from '../table-grid/table-grid.component';

@Component({
  selector: 'app-table-grid-past',
  templateUrl: './table-grid-past.component.html',
  styleUrls: ['../table-grid/table-grid.component.scss']
})

export class TableGridPastComponent extends TableGridComponent {

  @Input() reservations;


}

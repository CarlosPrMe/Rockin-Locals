import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-grid',
  templateUrl: './table-grid.component.html',
  styleUrls: ['./table-grid.component.scss'],
})
export class TableGridComponent implements OnInit {

  @Input() reservations;

  constructor() { }

  ngOnInit() {
  }

}

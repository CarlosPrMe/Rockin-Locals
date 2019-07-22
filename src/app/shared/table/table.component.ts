import { Component, OnInit, Input, Output, ViewChild, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {



  @Input() reservations: Array<any>;
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['day', 'band', 'local', 'hourIn', 'hours'];
  @Output()detailReservation = new EventEmitter();

  constructor() { }


  ngOnChanges(simpleChange: SimpleChanges) {
    if (simpleChange.reservations.currentValue.length > 0) {
      this.dataSource = new MatTableDataSource();
      this.reservations = simpleChange.reservations.currentValue
      length = this.reservations.length
      this.dataSource.data = this.reservations;
      this.dataSource.paginator = this.paginator;
    }
  }


  ngOnInit() {
  }


  detail(id){
    this.detailReservation.emit(id);

  }
}

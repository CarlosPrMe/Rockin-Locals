<<<<<<< HEAD
import { Component, OnInit, Input } from '@angular/core';
=======
import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
>>>>>>> 11a671b5fa87856b770498d61a8c79ae823e5ff4

@Component({
  selector: 'app-table-grid',
  templateUrl: './table-grid.component.html',
  styleUrls: ['./table-grid.component.scss'],
})
export class TableGridComponent implements OnInit, OnChanges {

  dataSource;
  @Input() reservations: Array<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['band', 'company', 'local', 'hours', 'hourIn', 'boton'];
  @Output()cancelReservation = new EventEmitter();
  @Output()detailReservation = new EventEmitter();
  constructor() { }

<<<<<<< HEAD
  constructor() { }
=======
  ngOnChanges(simpleChange: SimpleChanges) {
    if (simpleChange.reservations.currentValue.length > 0) {
      this.dataSource = new MatTableDataSource();
      this.reservations = simpleChange.reservations.currentValue
      length = this.reservations.length
      this.dataSource.data = this.reservations;
      this.dataSource.paginator = this.paginator;
    }
  }


  ngOnInit() { }
>>>>>>> 11a671b5fa87856b770498d61a8c79ae823e5ff4


  cancel(id) {
    this.cancelReservation.emit(id);
  }

  detail(id){
    this.detailReservation.emit(id);

  }
}

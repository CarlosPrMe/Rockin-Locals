<<<<<<< HEAD
import { Component, Input } from '@angular/core';
=======
import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
>>>>>>> 11a671b5fa87856b770498d61a8c79ae823e5ff4
import { TableGridComponent } from '../table-grid/table-grid.component';

@Component({
  selector: 'app-table-grid-past',
  templateUrl: './table-grid-past.component.html',
  styleUrls: ['../table-grid/table-grid.component.scss']
})

export class TableGridPastComponent extends TableGridComponent {


  @Input() reservations:Array<any>;
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output()detailReservation = new EventEmitter();
  displayedColumns: string[] = ['band', 'company', 'local', 'hours'];

<<<<<<< HEAD
=======

  ngOnChanges(simpleChange : SimpleChanges){
    if(simpleChange.reservations.currentValue.length > 0){
      this.dataSource = new MatTableDataSource();
      this.reservations = simpleChange.reservations.currentValue
      length = this.reservations.length
      this.dataSource.data = this.reservations;
      this.dataSource.paginator = this.paginator;
    }

  }
  detail(id){
    this.detailReservation.emit(id);

  }

>>>>>>> 11a671b5fa87856b770498d61a8c79ae823e5ff4
}

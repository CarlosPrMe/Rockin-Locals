import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
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

}

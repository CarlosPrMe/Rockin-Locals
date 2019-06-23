import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {



  @Input() reservations:Array<any>;
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['day', 'band', 'local', 'hours'];

  constructor() { }


  ngOnChanges(simpleChange : SimpleChanges){
    console.log(simpleChange);


    if(simpleChange.reservations.currentValue.length > 0){
      this.dataSource = new MatTableDataSource();
      this.reservations = simpleChange.reservations.currentValue
      length = this.reservations.length
      this.dataSource.data = this.reservations;
      this.dataSource.paginator = this.paginator;
    }

  }


  ngOnInit() {
  }

}

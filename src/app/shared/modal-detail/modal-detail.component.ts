import { Component, OnInit, Input, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-detail',
  templateUrl: './modal-detail.component.html',
  styleUrls: ['./modal-detail.component.scss']
})
export class ModalDetailComponent implements OnInit, OnChanges {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.data;
  }
  displayedColumns: string[] = ['band', 'company', 'local', 'detailHours', 'date', 'equipment', 'payment', 'moment', 'cost'];
  dataSource;

  ngOnInit() {
  }

  ngOnChanges() {

  }

}





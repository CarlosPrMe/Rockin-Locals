import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  inatalacion: string;
  dia: number;
  local: number;
  hora: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  { dia: 1, inatalacion: 'Hydrogen', local: 1.0079, hora: 'H' },
  { dia: 2, inatalacion: 'Helium', local: 4.0026, hora: 'He' },
  { dia: 3, inatalacion: 'Lithium', local: 6.941, hora: 'Li' },
  { dia: 4, inatalacion: 'Beryllium', local: 9.0122, hora: 'Be' },
  { dia: 5, inatalacion: 'Boron', local: 10.811, hora: 'B' },
  { dia: 6, inatalacion: 'Carbon', local: 12.0107, hora: 'C' },
  { dia: 7, inatalacion: 'Nitrogen', local: 14.0067, hora: 'N' },
  { dia: 8, inatalacion: 'Oxygen', local: 15.9994, hora: 'O' },
  { dia: 9, inatalacion: 'Fluorine', local: 18.9984, hora: 'F' },
  { dia: 10, inatalacion: 'Neon', local: 20.1797, hora: 'Ne' },
];

@Component({
  selector: 'app-table-material',
  templateUrl: './table-material.component.html',
  styleUrls: ['./table-material.component.scss']
})



export class TableMaterialComponent implements OnInit {

  displayedColumns: string[] = ['Día', 'Instalación', 'NºLocal', 'Hora'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}

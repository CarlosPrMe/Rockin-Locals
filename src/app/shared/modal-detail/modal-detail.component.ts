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
    //this.reservation =
    this.dataSource.data = this.data;
    debugger
  }

  //@Input() reservation:Array<any> = [];
  displayedColumns: string[] = ['band', 'company', 'local', 'detailHours', 'date', 'equipment', 'payment', 'moment', 'cost'];


  /*  reservation = {
     bandId: "5d1614acd3479b32e47594d2",
     bandName: "Kitsune Art",
     companyName: "Pika Studios",
     date:
     {
       day: 31,
       month: 7,
       year: 2019
     },

     equipment: [
       "Batería Tama SuperStar",
       "Amplificador de guitarra Mesa Booggie",
       "Amplificador de guitarra Line6"
     ],
     hours: [
       "11:00",
       "12:00",
       "13:00"],
     localName: "Local 1",

     methodPayment:
     {
       creditNumber: "",
       cvvCode: "",
       expireDate: "",
       method: "paypal"
     },

     moment: 1563399406799,
     numHours: 3,
     price: 9
   } */
  dataSource;

  ngOnInit() {
  }

  ngOnChanges(change: SimpleChanges) {

    if (change.reservation.currentValue) {

    }
    //this.reservation = change.currenValue

  }

}





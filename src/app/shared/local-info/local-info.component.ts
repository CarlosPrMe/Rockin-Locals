import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { AddtoFavouritesService } from '../../services/add-favourites.service';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { Reservation } from '../../mis clases/reservation';
import { ReservationsService } from '../../services/reservations.service';
import { Router } from '@angular/router';
import { Favourite } from '../../mis clases/favourite';


@Component({
  selector: 'app-local-info',
  templateUrl: './local-info.component.html',
  styleUrls: ['./local-info.component.scss']
})
export class LocalInfoComponent implements OnInit, OnChanges {

  @Input() localSelected;
  @Input() user;
  @Input() userData;
  @Output() askReservation = new EventEmitter();
  daySelected = new BehaviorSubject(undefined);
  myForm;
  reservation = new Reservation();
  hoursAvailable = [];
  favourite = new Favourite();


  constructor(private addtoFavouritesService: AddtoFavouritesService, private fb: FormBuilder,
    private reservationsService: ReservationsService, private router: Router) { }

  ngOnInit() {

    this.myForm = this.fb.group({
      drum: [""],
      ampGuit1: [""],
      ampGuit2: [""],
      ampBass: [""],
      keyboard: [""],
      speakers: [""],
      others: [""],
      hour11: [""],
      hour12: [""],
      hour13: [""],
      hour14: [""],
      hour15: [""],
      hour16: [""],
      hour17: [""],
      hour18: [""],
      hour19: [""],
      hour20: [""],
      hour21: [""],
      hour22: [""],
    })

  }

  ngOnChanges(simple: SimpleChanges) {
  }

  addToFavourites(user, local) {
    //this.addtoFavouritesService.addFavourite(user, local).then((data) => console.log(data))

    this.favourite.companyName = local.companyName;
    this.favourite.companyId =local.id;
    this.favourite.localName =local.localName;

  }

  getDay(day) {
    this.reservationsService.daySelected.next(day)
    this.daySelected.next(day)
    this.resetHours();

    this.reservationsService.askHoursAvailable(day.day).then((res: Array<any>) => {
      if (res.length > 0) {
        this.hoursAvailable = res;
        for (const hour in this.hoursAvailable[0].hours) {
          if (this.hoursAvailable[0].hours[hour] === true) {
            this.myForm.controls[`${hour}`].disable()
          }
        }
      }
    })
  }

  submit(event, form) {
    this.reservation.companyName = this.localSelected.companyName;
    this.reservation.localName = this.localSelected.name;
    this.reservation.date = this.reservationsService.daySelected.value;
    this.reservation.equipment = this.getEquipmentSelected(form.value);
    this.reservation.hours = this.getHoursSelected(form.value);
    this.reservation.numHours = this.getHoursSelected(form.value).length;
    this.reservation.bandName = 'Nombre del Grupo';
    this.reservation.price = this.localSelected.price;
    this.askReservation.emit(this.reservation)
    this.router.navigateByUrl('/payment')
  }


  getHoursSelected(form) {
    let hours = []
    form.hour11 ? hours.push('11:00') : null;
    form.hour12 ? hours.push('12:00') : null;
    form.hour13 ? hours.push('13:00') : null;
    form.hour14 ? hours.push('14:00') : null;
    form.hour15 ? hours.push('15:00') : null;
    form.hour16 ? hours.push('16:00') : null;
    form.hour17 ? hours.push('17:00') : null;
    form.hour18 ? hours.push('18:00') : null;
    form.hour19 ? hours.push('19:00') : null;
    form.hour20 ? hours.push('20:00') : null;
    form.hour21 ? hours.push('21:00') : null;
    form.hour22 ? hours.push('22:00') : null;
    return hours;
  }


  resetHours() {
    this.myForm.controls['hour11'].enable();
    this.myForm.controls['hour12'].enable();
    this.myForm.controls['hour13'].enable();
    this.myForm.controls['hour14'].enable();
    this.myForm.controls['hour15'].enable();
    this.myForm.controls['hour16'].enable();
    this.myForm.controls['hour17'].enable();
    this.myForm.controls['hour18'].enable();
    this.myForm.controls['hour19'].enable();
    this.myForm.controls['hour20'].enable();
    this.myForm.controls['hour21'].enable();
    this.myForm.controls['hour22'].enable();
  }

  getEquipmentSelected(form) {
    let equipmentSelected: Array<any> = []
    form.drum ? equipmentSelected.push(this.localSelected.equipment.drum) : null;
    form.ampBass ? equipmentSelected.push(this.localSelected.equipment.ampBass) : null;
    form.ampGuit1 ? equipmentSelected.push(this.localSelected.equipment.ampGuit1) : null;
    form.ampGuit2 ? equipmentSelected.push(this.localSelected.equipment.ampGuit2) : null;
    form.speakers ? equipmentSelected.push(this.localSelected.equipment.speakers) : null;
    form.keyboard ? equipmentSelected.push(this.localSelected.equipment.keyboard) : null;
    form.others ? equipmentSelected.push(this.localSelected.equipment.others) : null;
    return equipmentSelected;
  }


}

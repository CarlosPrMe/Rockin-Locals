import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FavouritesService } from '../../services/favourites.service';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { Reservation } from '../../mis clases/reservation';
import { ReservationsService } from '../../services/reservations.service';
import { Router } from '@angular/router';
import { Favourite } from '../../mis clases/favourite';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';


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
  daySelected = new BehaviorSubject(false); //PAra saber si es un dia sin ninguna reserva, es decir, sin id
  myForm;
  reservation = new Reservation();
  hoursAvailable = [];
  reservObj: any = {}; //Objeto que paso para hacer un put o post de las horas de reserva

  favourite = new Favourite();
  added: boolean = false; // Para saber si el local ya está en favoritos y mostrar un boton un otro, hacer una logica u otra


  constructor(private favouritesService: FavouritesService, private fb: FormBuilder,
    private reservationsService: ReservationsService, private router: Router,
    private ngCalendar: NgbCalendar) { }



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

    this.getDay(this.ngCalendar.getToday());

  }

  ngOnChanges(simpleChange: SimpleChanges) {
    if (simpleChange.userData.currentValue) {
      this.checkFavourite(simpleChange.userData.currentValue, this.localSelected)
    }
  }

  checkFavourite(user, local) {
    debugger
    for (let i = 0; i < user.favourites.length; i++) {
      if (user.favourites[i].companyName === local.companyName) {
        this.added = true;
        break
      }
    }
  }

  addToFavourites(user, local) {

    //Servicio para añadir a favoritos
    //this.favouritesService.addFavourite(user, local,this.favourite).then((data) => console.log(data))

    //this.favourite.companyName = local.companyName;  Creo que esto  no lo utilizo
    //this.favourite.companyId = local.id;  Creo que esto  no lo utilizo
    //this.favourite.localName = local.name;  Creo que esto  no lo utilizo

  }

  deleteFavourite(event, user, local) {
    console.log(user, +local);
    this.added = false // A modo de juego
    //this.favouritesService.deleteFavourite(user,local).then(
    // this.added= false
    //) Implementar bien esta peticion
  }

  getDay(date) {
    this.reservationsService.daySelected.next(date) //Formato Date
    this.daySelected.next(date)
    this.resetHours();

    this.reservationsService.askHoursAvailable(date, this.localSelected.companyName).then((res: Array<any>) => {
      console.log(res);


      if (res.length > 0) {
        this.reservationsService.hoursAvailable.next(res[0].hours);
        this.reservObj.id = res[0]._id;
        this.hoursAvailable = res;
        for (const hour in this.hoursAvailable[0].hours) {
          if (this.hoursAvailable[0].hours[hour] === true) {
            this.myForm.controls[`${hour}`].disable()
          }
        }

        this.reservationsService.emptyDay.next(false);
        debugger
      } else {
        this.reservationsService.emptyDay.next(true);
        debugger
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
    this.reservation.bandName = this.userData.bandName;
    this.reservation.price = this.localSelected.price;
    this.askReservation.emit(this.reservation)
    console.log(this.reservation);
    console.log(this.changeAvailavility(form.value));
debugger
    if(this.reservObj.id){
      this.reservObj.hours = Object.assign(this.reservationsService.hoursAvailable.value, this.changeAvailavility(form.value))
      this.reservationsService.hoursAvailable.next(this.reservObj);
      debugger
    }else{
      this.reservObj=this.changeAvailavility(form.value)
      this.reservationsService.hoursAvailable.next(this.reservObj);
      debugger
    }

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

  changeAvailavility(form) {
    let hours: any = {}
    form.hour11 ? hours.hour11 = true : null;
    form.hour12 ? hours.hour12 = true : null;
    form.hour13 ? hours.hour13 = true : null;
    form.hour14 ? hours.hour14 = true : null;
    form.hour15 ? hours.hour15 = true : null;
    form.hour16 ? hours.hour16 = true : null;
    form.hour17 ? hours.hour17 = true : null;
    form.hour18 ? hours.hour18 = true : null;
    form.hour19 ? hours.hour19 = true : null;
    form.hour20 ? hours.hour20 = true : null;
    form.hour21 ? hours.hour21 = true : null;
    form.hour22 ? hours.hour22 = true : null;
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

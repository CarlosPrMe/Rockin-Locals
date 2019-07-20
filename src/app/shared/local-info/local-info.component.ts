import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { FavouritesService } from '../../services/favourites.service';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { Reservation } from '../../mis clases/reservation';
import { ReservationsService } from '../../services/reservations.service';
import { Router } from '@angular/router';
import { Favourite } from '../../mis clases/favourite';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';


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
  today: NgbDate; //Para sacar el dia actual y desactivar las horas pasadas en este dia
  now: Number;//Para sacar la hora actual y desactivar las horas pasadas en este dia
  //allHours: object = { hour11: 11, hour12: 12, hour13: 13, hour14: 14, hour15: 15, hour16: 16, hour17: 17, hour18: 18, hour19: 19, hour20: 20, hour21: 21, hour22: 22 }
  allHours: Array<number> = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
  favourite = new Favourite();
  added: boolean = false; // Para saber si el local ya está en favoritos y mostrar un boton un otro, hacer una logica u otra
  @ViewChild('image') image: ElementRef;

  disabledHours: object;

  constructor(private favouritesService: FavouritesService, private fb: FormBuilder,
    private reservationsService: ReservationsService, private router: Router,
    private ngCalendar: NgbCalendar,
    private loginService: LoginService) { }



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
    this.today = this.ngCalendar.getToday()
    this.getDay(this.today);
    //this.disabledHours = null;
    ;
  }

  ngOnChanges(simpleChange: SimpleChanges) {

    if (simpleChange.userData.currentValue) {
      this.checkFavourite(simpleChange.userData.currentValue, this.localSelected)
    }

  }

  checkFavourite(user, local) {

    if (user.favourites.length > 0) {
      for (let i = 0; i < user.favourites.length; i++) {
        if (user.favourites[i].companyName === local.companyName) {
          this.added = true;
          break
        }
      }
    }
  }

  addToFavourites(user, local) {

    let favourites = {
      idLocal: local._id,
      localName: local.name,
      companyName: local.companyName// No estoy seguro si el nombre de la propiedad es company:local.companyName o companyName:local.companyName
    }

    if (!user.favourites || user.favourites.length === 0) {
      user.favourites = [];
    }
    user.favourites.push(favourites);
    this.favouritesService.modifyFavourite(user).catch((err) => {

      if (err) {
        this.router.navigate(['/index']);
        return swal.fire({
          title: '¡Error al editar favoritos!',
          type: "error",
          showConfirmButton: false,
        })
      }
    }).then((res: any) => {

      if (res.data) {
        this.loginService.user.next(res.data);
        this.added = true;
        return swal.fire({
          title: '¡Local añadido!',
          type: "success",
          showConfirmButton: false,
        })
      }
    })
  }

  deleteFavourite(event, user, local) {
    let currentUser = { ...user };

    //let favourites = user.favourites.filter(f => f.companyName !== local.companyName);
    //user = Object.assign(user, favourites);
    this.favouritesService.deleteFavourite(user, local._id).catch((err) => {

      if (err) {
        this.loginService.user.next(currentUser);
        this.router.navigate(['/index']);
        return swal.fire({
          title: '¡Error al editar favoritos!',
          type: "error",
          showConfirmButton: false,
        })
      }
    }).then((res: any) => {
      if (res.data) {
        this.loginService.user.next(res.data);
        this.added = false;
      }
    })
  }

  getDay(date) {
    this.reservationsService.daySelected.next(date)
    this.daySelected.next(date)
    this.resetHours();
    this.disabledHours = {};
    this.now = new Date().getHours();

    if (this.today.equals(date)) {

      this.disableHoursByHour(this.now, this.allHours)

    }
    this.reservObj = {}
    debugger
    //this.reservationsService.askHoursAvailable(date, this.localSelected.companyName).then((res: Array<any>) => {
    this.reservationsService.askHoursAvailable(date, this.localSelected.companyId).then((res: Array<any>) => {
      //console.log(res);
      debugger

      if (res.length > 0) {
        this.reservationsService.hoursAvailable.next(res[0].hours);
        this.reservObj.id = res[0]._id;
        this.hoursAvailable = res;

        for (const hour in this.hoursAvailable[0].hours) {
          if (this.hoursAvailable[0].hours[hour] === true) {
            this.myForm.controls[`${hour}`].disable()
            this.disabledHours[hour] = true;

          }
        }
        this.reservationsService.emptyDay.next(false);
      } else {
        this.reservationsService.emptyDay.next(true);

      }
    })
  }

  submit(event, form) {

    this.disabledHours = null;

    this.reservation.companyName = this.localSelected.companyName;
    this.reservation.localName = this.localSelected.name;
    this.reservation.date = this.reservationsService.daySelected.value;
    this.reservation.equipment = this.getEquipmentSelected(form.value);
    this.reservation.hours = this.getHoursSelected(form.value);
    this.reservation.numHours = this.getHoursSelected(form.value).length;
    this.reservation.bandName = this.userData.bandName;
    this.reservation.price = this.localSelected.price;
    this.reservation.bandId = this.userData._id;
    this.reservation.companyId = this.localSelected.companyId;
    this.reservation.moment = Date.now();

    this.askReservation.emit(this.reservation)
    //console.log(this.reservation);
    //console.log(this.changeAvailavility(form.value));//Solo da un objeto con las horas reservadas que luego se añaden a las que habia o si no se crea uno nuevo

    if (this.reservObj.id) {

      this.reservObj.hours = Object.assign(this.reservationsService.hoursAvailable.value, this.changeAvailavility(form.value))
      this.reservationsService.hoursAvailable.next(this.reservObj); //A lo mejor aqui hay que pasarlo this.reservObj.hours. ASi le estoy pasando un prop _id y un obj con las horas

    } else {

      this.reservObj.hours = this.changeAvailavility(form.value)
      this.reservationsService.hoursAvailable.next(this.reservObj);//A lo mejor aqui hay que pasarlo this.reservObj.hours. Asi solo le paso ls horas

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


  zoom(event) {
    this.image.nativeElement.requestFullscreen();
  }

  disableHoursByHour(now, hours) {
    for (let i = 0; i < hours.length; i++) {
      ;
      if (hours[i] <= now) {
        this.disabledHours[`hour${hours[i]}`] = true;
      }
      if (hours[i] > now) {
        break;
      }
    }

    for (const hour in this.disabledHours) {
      this.myForm.controls[`${hour}`].disable()
    }

    debugger
  }

  scroll($event){
    window.scrollTo({
      top:0,
      behavior: 'smooth'
    })
  }

}

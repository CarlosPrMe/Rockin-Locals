import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Injectable()

export class ReservationsService {

  daySelected = new BehaviorSubject(null);
  currentReservation= new BehaviorSubject(null);

  constructor(private httpClient: HttpClient, private ngCalendar: NgbCalendar){}

  getReservation(user){
    return this.httpClient.get(`${environment.apiUrl}/reservation?search=${user}`).toPromise();
  }



  askHoursAvailable(day){ // Prueba para avanzar con las peticione...cambiar el endpoint
    return this.httpClient.get(`${environment.apiUrl}/disponibilidad_test?search=${day}`).toPromise();
  }


  makeReservation(reserva){
    return this.httpClient.post(`${environment.apiUrl}/disponibilidad_test`, reserva).toPromise()
  }
}

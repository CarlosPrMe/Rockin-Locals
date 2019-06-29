import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Injectable()

export class ReservationsService {

  daySelected = new BehaviorSubject(null);
  currentReservation = new BehaviorSubject(null);
  hoursAvailable = new BehaviorSubject(null)
  emptyDay = new BehaviorSubject(false)

  constructor(private httpClient: HttpClient, private ngCalendar: NgbCalendar) { }

  getReservationByLocal(user) {
    let params = new HttpParams().set('companyName', user);
    return this.httpClient.get(`${environment.apiUrl}/reservations`, { params }).toPromise();
  }
  getReservationByBand(user) {
    let params = new HttpParams().set('bandName', user);
    return this.httpClient.get(`${environment.apiUrl}/reservations`, { params }).toPromise();
  }

  askHoursAvailable(date, company) {
    const params = new HttpParams().set('day', date.day).set('month', date.month).set('year', date.year).set('companyName', company);
    //debugger
    return this.httpClient.get(`${environment.apiUrl}/availabilities`, { params }).toPromise();
  }


  makeReservation(reserva) {
    debugger
    return this.httpClient.post(`${environment.apiUrl}/reservations`, {reserva}).toPromise();
  }

  startAvailability(date, companyName, local, newHours) {
    return this.httpClient.post(`${environment.apiUrl}/availabilities/`,{
      date: date,
      companyName: companyName,
      hours: newHours.hours,
      localName: local}).toPromise();
  }

  modifyAvailability(date, companyName, local, newHours) {
    debugger
    return this.httpClient.put(`${environment.apiUrl}/availabilities/${newHours.id}`,
      {
        date: date,
        companyName: companyName,
        hours: newHours.hours,
        localName: local
      }).toPromise();
  }
}

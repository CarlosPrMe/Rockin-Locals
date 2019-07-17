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

  /*   getReservationByLocal(user) {
      let params = new HttpParams().set('companyName', user);
      return this.httpClient.get(`${environment.apiUrl}/reservations`, { params }).toPromise();
    } */
  getReservationByLocal(id) {
    let params = new HttpParams().set('companyId', id);
    return this.httpClient.get(`${environment.apiUrl}/reservations`, { params }).toPromise();
  }
  /*   getReservationByBand(user) {
      let params = new HttpParams().set('bandName', user);
      return this.httpClient.get(`${environment.apiUrl}/reservations`, { params }).toPromise();
    } */
  getReservationByBand(id) {
    let params = new HttpParams().set('bandId', id);
    return this.httpClient.get(`${environment.apiUrl}/reservations`, { params }).toPromise();
  }

  makeReservation(reserva) {
    return this.httpClient.post(`${environment.apiUrl}/reservations`, { reserva }).toPromise();
  }
  deleteReservation(id) {

    return this.httpClient.delete(`${environment.apiUrl}/reservations/${id}`).toPromise();
  }


  /*   askHoursAvailable(date, company) { ESTE METODO FUNCIONA PERFECTAMENTE
      const params = new HttpParams().set('day', date.day).set('month', date.month).set('year', date.year).set('companyName', company);
      return this.httpClient.get(`${environment.apiUrl}/availabilities`, { params }).toPromise();
    } */

  askHoursAvailable(date, companyId) {
    const params = new HttpParams().set('day', date.day).set('month', date.month).set('year', date.year).set('companyId', companyId);
    return this.httpClient.get(`${environment.apiUrl}/availabilities`, { params }).toPromise();
  }

/*   startAvailability(date, companyName, local, newHours) {
    return this.httpClient.post(`${environment.apiUrl}/availabilities/`, {
      date: date,
      companyName: companyName,
      hours: newHours.hours,
      localName: local
    }).toPromise();
  }
 */
startAvailability(date, companyName, companyId, local, newHours) {
  return this.httpClient.post(`${environment.apiUrl}/availabilities/`, {
    date: date,
    companyName: companyName,
    hours: newHours.hours,
    localName: local,
    companyId: companyId,
  }).toPromise();
}

/*   modifyAvailability(date, companyName, local, newHours) {

    return this.httpClient.put(`${environment.apiUrl}/availabilities/${newHours.id}`,
      {
        date: date,
        companyName: companyName,
        hours: newHours.hours,
        localName: local
      }).toPromise();
  } */
  modifyAvailability(date, companyName, companyId, local, newHours) {

    return this.httpClient.put(`${environment.apiUrl}/availabilities/${newHours.id}`,
      {
        date: date,
        companyName: companyName,
        hours: newHours.hours,
        localName: local,
        companyId: companyId,
      }).toPromise();
  }

 // deleteAvailability(date, companyName, companyId, hours) {
 async deleteAvailability(res) {
  let hours:any = {};
  let hoursToObject = res.hours.forEach(hour => {
      hours[hour] = true;
  });


    const params = new HttpParams().set('day', res.date.day).set('month', res.date.month).set('year', res.date.year)
    .set('companyName',res.companyName).set('companyId',res.companyId).set('hours', hours)

    return this.httpClient.delete(`${environment.apiUrl}/availabilities`, { params }).toPromise();
  }
}

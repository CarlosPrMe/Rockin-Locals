import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()

export class GetReservationsService {

  constructor(private httpClient: HttpClient){}


  getReservation(user){
   // debugger;
    return this.httpClient.get(`${environment.apiUrl}/reservations?search=${user}`).toPromise()
  }


}

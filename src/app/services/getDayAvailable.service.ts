import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';



@Injectable()

export class GetDayAvailableService {



  constructor(private httpClient: HttpClient) { }


  getHoursAvailable(day, local) {

    return this.httpClient.get(`${environment.apiUrl}/${day}`).toPromise()
  }
}

hours: [
  { hour: '11:00', available: true },
  { hour: '12:00', available: true },
  { hour: '13:00', available: true },
  { hour: '14:00', available: true },
  { hour: '15:00', available: true },
  { hour: '16:00', available: true },
  { hour: '17:00', available: true },
  { hour: '18:00', available: true },
  { hour: '19:00', available: true },
  { hour: '20:00', available: true },
  { hour: '21:00', available: true },
  { hour: '22:00', available: true },
]


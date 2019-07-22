import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()

export class  LocationService {

  constructor(private httpClient: HttpClient){}

 async getLocation(city,address,postalCode){

   return this.httpClient.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}${address}${postalCode}&key=AIzaSyBLcfK5xmIW_LvJWRRBPXUQLrIi3CKg4w8`).toPromise();
  }

}

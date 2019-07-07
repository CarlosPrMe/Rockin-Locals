import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()

export class  LocationService {

  constructor(private httpClient: HttpClient){}

 async getLocation(city,address,postalCode){
   debugger
   return this.httpClient.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}${address}${postalCode}&key=AIzaSyBLcfK5xmIW_LvJWRRBPXUQLrIi3CKg4w8`).toPromise();
  }


  /*
{results: Array(1), status: "OK"}
results: Array(1)
0:
address_components: (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
formatted_address: "Av. de los Metales, 16, 28914 Leganés, Madrid, España"
geometry:
bounds: {northeast: {…}, southwest: {…}}
location: {lat: 40.328365, lng: -3.7760909}
location_type: "ROOFTOP"
viewport: {northeast: {…}, southwest: {…}}
__proto__: Object
place_id: "ChIJw4LJMSiKQQ0RQbTfWFfVaP4"
types: ["premise"]
__proto__: Object
length: 1
__proto__: Array(0)
status: "OK"

  */

 //results[0].geometry.location


}

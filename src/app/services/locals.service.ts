import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable()

export class LocalsService {

  constructor(private httpClient: HttpClient){}

  localSelected;


  getLocalsByCity(city) {

    if (!isNaN(+city)) {
      let params = new HttpParams().set('postalCode',city);
      return this.httpClient.get(`${environment.apiUrl}/locals`, {params}).toPromise();
    }else{
      let params = new HttpParams().set('city', city);
      return this.httpClient.get(`${environment.apiUrl}/locals`, {params}).toPromise();
    }
  }

 async getLocalsById(id) {
    return this.httpClient.get(`${environment.apiUrl}/locals/${id}`).toPromise();
  }

/*   getLocalsByLocal(user) {
    return this.httpClient.get(`${environment.apiUrl}/locals?companyName=${user}`).toPromise();
  } */
  getLocalsByLocal(id) {
    let params = new HttpParams().set('companyId', id);
    debugger
    return this.httpClient.get(`${environment.apiUrl}/locals`,{params}).toPromise();
  }

  selectLocal(local) {
    this.localSelected = local;
  }

  editLocal(local){

   return this.httpClient.put(`${environment.apiUrl}/locals/${local._id}`,local).toPromise();
  }

  /*   deleteLocal(id){

      return this.httpClient.delete(`${environment.apiUrl}/locals/${id}`).toPromise()
    } */
  deleteLocal(id){

    return this.httpClient.delete(`${environment.apiUrl}/locals/${id}`).toPromise()
  }

/*   deleteLocalByCompany(companyName){
    let params = new HttpParams().set('companyName',companyName)

    return this.httpClient.delete(`${environment.apiUrl}/locals/${params}`).toPromise()
  } */
  deleteLocalByCompany(companyId){
    let params = new HttpParams().set('companyId',companyId)

    return this.httpClient.delete(`${environment.apiUrl}/locals`,{ params }).toPromise()
  }

  createLocal(local){

    return this.httpClient.post(`${environment.apiUrl}/locals`,local).toPromise();
  }

}

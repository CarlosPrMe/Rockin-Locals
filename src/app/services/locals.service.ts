import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable()

export class LocalsService {

  constructor(private httpClient: HttpClient){}

  localSelected;

  getLocalsByCity(city) {
    return this.httpClient.get(`${environment.apiUrl}/local?search=${city}`).toPromise();
  }
 async getLocalsById(id) {
    return this.httpClient.get(`${environment.apiUrl}/local/${id}`).toPromise();
  }

  getLocalsByLocal(user) {
    return this.httpClient.get(`${environment.apiUrl}/local?search=${user}`).toPromise();
  }

  selectLocal(local) {
    this.localSelected = local;
  }

  editLocal(local){
   return this.httpClient.put(`${environment.apiUrl}/local/${local.id}`,local).toPromise();
  }

}

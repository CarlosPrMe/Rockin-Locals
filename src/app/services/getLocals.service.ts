import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable()

export class GetLocalsService {

  constructor(private httpClient: HttpClient){}

  localSelected;

  getLocalsByCity(city) {
    return this.httpClient.get(`${environment.apiUrl}/local?search=${city}`).toPromise();
  }

  selectLocal(local) {
    this.localSelected = local;
    console.log(this.localSelected);

  }


}

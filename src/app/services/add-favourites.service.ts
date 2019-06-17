import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()

export class AddtoFavouritesService {

  constructor(private httpClient: HttpClient) { }


  addFavourite(user, local) {
    return this.httpClient.put(`${environment.apiUrl}/user/${user.id}`, { favourites:{
      idLocal:local.id,
      localName:local.name,
      company:local.companyName
    }  }).toPromise();

  }




}




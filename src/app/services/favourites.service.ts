import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()

export class FavouritesService {

  constructor(private httpClient: HttpClient) { }


  addFavourite(user, local) {
    return this.httpClient.patch(`${environment.apiUrl}/user/${user.id}`, {
      favourites: {
        idLocal: local.id,
        localName: local.name,
        company: local.companyName
      }

    }).toPromise();

  }

  deleteFavourite(userId, idFavouriteToDelete) {

    // hay que hacer la lógica para que busque en el objeto donde eestán los favoritos y que elimine el que tenga este id
    return this.httpClient.patch(`${environment.apiUrl}/user/${userId}`, idFavouriteToDelete).toPromise()

  }




}




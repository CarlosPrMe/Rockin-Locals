import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()

export class FavouritesService {

  constructor(private httpClient: HttpClient) { }


  modifyFavourite(user) {
    return this.httpClient.put(`${environment.apiUrl}/user/${user.id}`,user).toPromise();

  }

  deleteFavourite(user, idFavouriteToDelete) {
    let favourites = user.favourites.filter(f => f.idLocal !== idFavouriteToDelete);
    user.favourites.push(favourites);

    user = Object.assign(user, favourites);
    // hay que hacer la lógica para que busque en el objeto donde eestán los favoritos y que elimine el que tenga este id
    return this.httpClient.put(`${environment.apiUrl}/user/${user.Id}`, user).toPromise()

  }




}




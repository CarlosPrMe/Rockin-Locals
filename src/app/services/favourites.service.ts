import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()

export class FavouritesService {

  constructor(private httpClient: HttpClient) { }


  modifyFavourite(user) {
    return this.httpClient.put(`${environment.apiUrl}/users/${user._id}`,user).toPromise();
  }

  deleteFavourite(user, idFavouriteToDelete) {
    let favourites = user.favourites.filter(f => f.idLocal !== idFavouriteToDelete);
    user.favourites=[]
    user.favourites=favourites;
    return this.httpClient.put(`${environment.apiUrl}/users/${user._id}`, user).toPromise()

  }

}




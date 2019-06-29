import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()

export class FavouritesService {

  constructor(private httpClient: HttpClient) { }


  modifyFavourite(user) {
    debugger
    return this.httpClient.put(`${environment.apiUrl}/users/${user._id}`,user).toPromise();

  }

  deleteFavourite(user, idFavouriteToDelete) {
    debugger
    let favourites = user.favourites.filter(f => f.idLocal !== idFavouriteToDelete);
    user.favourites=[]
    user.favourites=favourites;

    //user = Object.assign(user, favourites);
    // hay que hacer la lógica para que busque en el objeto donde eestán los favoritos y que elimine el que tenga este id
    return this.httpClient.put(`${environment.apiUrl}/users/${user._id}`, user).toPromise()

  }




}




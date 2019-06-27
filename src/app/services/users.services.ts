import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()

export class UserService {

  constructor(private httpClient: HttpClient) { }

  addUser(user) {
    //console.log(user);

    return this.httpClient.post(`${environment.apiUrl}/auth/sign-up`, user).toPromise();
  }


  editUser(user){
    return this.httpClient.put(`${environment.apiUrl}/users/${user.id}`,user).toPromise();
  }

  deleteUser(id){
    return this.httpClient.delete(`${environment.apiUrl}/users/${id}`).toPromise();
  }

}

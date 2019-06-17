import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()

export class UserService {

  constructor(private httpClient: HttpClient) { }

  addUser(user) {
    return this.httpClient.post(`${environment.apiUrl}/user`, user).toPromise();
  }

  editUser(user){
    return this.httpClient.patch(`${environment.apiUrl}/user/${user.id}`,user).toPromise();
  }

  deleteUser(id){
    return this.httpClient.delete(`${environment.apiUrl}/user/${id}`).toPromise();
  }

}

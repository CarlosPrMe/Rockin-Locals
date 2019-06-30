import { Injectable, } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { Subject, BehaviorSubject } from "rxjs";
import swal from 'sweetalert2';
import { async } from '@angular/core/testing';

@Injectable()

export class LoginService {

  constructor(private httpClient: HttpClient) { }

  user = new BehaviorSubject(null);
  token;
  isLoged = new BehaviorSubject(false);

  async login(email, pass) {
    //debugger;
    return this.httpClient.post(`${environment.apiUrl}/auth/login`, {
      email: email,
      password: pass

    }).subscribe((response: any) => {
      debugger;
      if(response.access_token){

        this.token = response.access_token;
        this.user.next(response.user)
        this.isLoged.next(true);
        console.log(this.user.value);
        /* swal.fire({
          title: `Hola ${response.user.userName}`,
          type: "success",
          showConfirmButton: false,
        }); */

      }else if (response.status === 401){
        swal.fire({
          title: 'Error en el login',
          text: 'Usuario/contraseña incorrecto',
          type: "error",
          showConfirmButton: false,
        });
        console.log(response);
      }


    });
  }

/*   login(user, pass) {
    return this.httpClient.post(`${environment.apiUrl}`, {
      email: user,
      password: pass
    }).toPromise().then((response: any) => {
      this.token = response.access_token;
      this.user.next(response.user)
      this.isLoged.next(true);
      console.log(this.user.value);

    });
  } */



  getToken(): string {
    return this.token;
  }


  logOut() {

    return this.httpClient.get(`${environment.apiUrl}/auth/logout`).toPromise()
    .then((res)=>{
      debugger
      console.log(res);
      this.token = null;
      this.user.next(false);
      this.isLoged.next(false);
    })
  }

}

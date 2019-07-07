import { Injectable, } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import {  BehaviorSubject } from "rxjs";
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LocalsService } from './locals.service';

@Injectable()

export class LoginService {

  constructor(private httpClient: HttpClient, private router: Router,
    private localService: LocalsService) { }

  user = new BehaviorSubject(null);
  token;
  isLoged = new BehaviorSubject(false);

  async login(email, pass) {
    debugger;
    return this.httpClient.post(`${environment.apiUrl}/auth/login`, {
      email: email,
      password: pass

    }).subscribe((res: any) => {
      console.log(res)
      debugger;
      if (res.token) {
        this.token = res.token;
        localStorage.setItem('access_token', this.token)
        debugger
        this.httpClient.get(`${environment.apiUrl}/auth/me`).toPromise().then((data: any) => {

          this.user.next(data)
          this.isLoged.next(true);
          console.log(this.user.value);

        })


      } else if (res.status === 401) {
        swal.fire({
          title: 'Error en el login',
          text: 'Usuario/contraseña incorrecto',
          type: "error",
          showConfirmButton: false,
        });
        console.log(res);
      }


    });
  }

  getToken(): string {
    return this.token;
  }


  logOut() {

    return this.httpClient.get(`${environment.apiUrl}/auth/logout`).toPromise()
      .then((res) => {
        debugger
        console.log(res);
        this.token = null;
        this.user.next(false);
        this.isLoged.next(false);
        localStorage.removeItem('access_token');
        //this.localService.localSelected.next(null)
        this.router.navigateByUrl('/index');

      })
  }


  async  checkUserLocalStorage(token) {
    debugger
    return this.httpClient.get(`${environment.apiUrl}/auth/me`).toPromise();

  }
}

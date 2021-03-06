import { Injectable, } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { BehaviorSubject } from "rxjs";
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
    return this.httpClient.post(`${environment.apiUrl}/auth/login`, {
      email: email,
      password: pass
    }).toPromise().catch(err => {
      if (err.status > 400) {
        return swal.fire({
          title: 'Error en el login',
          text: 'Usuario/contraseña incorrecto',
          type: "error",
          showConfirmButton: false,
        });
      }
    }).then((res: any) => {
      if (res.token) {
        this.token = res.token;
        localStorage.setItem('access_token', this.token)
        this.httpClient.get(`${environment.apiUrl}/auth/me`).toPromise().then((data: any) => {
          this.user.next(data)
          this.isLoged.next(true);
        })
      }
    });
  }

  getToken(): string {
    return this.token;
  }


  logOut() {
    return this.httpClient.get(`${environment.apiUrl}/auth/logout`).toPromise()
      .then((res) => {
        this.token = null;
        this.user.next(false);
        this.isLoged.next(false);
        localStorage.removeItem('access_token');
        this.router.navigateByUrl('/index');
      })
  }

  async  checkUserLocalStorage(token) {
    return this.httpClient.get(`${environment.apiUrl}/auth/me`).toPromise();

  }
}

import { Injectable, } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { Subject, BehaviorSubject } from "rxjs";

@Injectable()

export class LoginService {

  constructor(private httpClient: HttpClient) { }

  user = new BehaviorSubject(null);
  token;
  isLoged = new BehaviorSubject(false);

  login(user, pass) {
    return this.httpClient.post(`https://localhost:3000/auth/login`, {
      email: user,
      password: pass
    }).toPromise().then((response: any) => {
      this.token = response.access_token;
      this.user.next(response.user)
      this.isLoged.next(true);
      console.log(this.user.value);

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
    this.token = null;
    this.user.next(false);
    this.isLoged.next(false);
  }

}

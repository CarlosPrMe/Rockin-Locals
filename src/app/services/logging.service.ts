import { Injectable, } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, BehaviorSubject } from "rxjs";

@Injectable()

export class LoggingService {

  constructor(private httpClient: HttpClient) { }

  user = new BehaviorSubject(null);
  token;
  isLogged = new BehaviorSubject(false);

  login(user, pass) {
    return this.httpClient.post(`https://localhost:3000/auth/login`, {
      email: user,
      password: pass
    }).toPromise().then((response: any) => {
      this.token = response.access_token;
      this.user.next(response.user)
      this.isLogged.next(true);
    });
  }


  logOut() {
    this.token = null;
    this.user.next(false);
    this.isLogged.next(false);
  }

}

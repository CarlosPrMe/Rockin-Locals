import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { tap } from 'rxjs/operators';

@Injectable()
/* export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(private authorization: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    if (!req.url.includes('auth/login')) {
      //esto es la flecha hacia abajo
      const secureReq = req.clone({
        // url: req.url.replace('http://', 'https://')
        headers: req.headers.set('access_token', this.authorization.getToken() ? this.authorization.getToken() : localStorage.token)
        // send the cloned, "secure" request to the next handler.
      });
      //console.log('AuthorizationInterceptor request');
      return next.handle(secureReq).pipe(
        //esto es la flecha hacia arriba
        tap((event: any) => {
          if (event && event.url) {
            // console.log('AuthorizationInterceptor response', event);
          }
        })
      );
    }
    return next.handle(req);
  }
} */

export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(private loginService : LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

      if (!req.url.includes('auth/login') && !req.url.includes('maps.googleapis.com')) {
       //  ;

      const secureReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${this.loginService.getToken() ? this.loginService.getToken() : localStorage.access_token}`)

      });
      //
      //console.log(secureReq);

      return next.handle(secureReq).pipe(
        tap((event: any) => {
          if (event && event.url) {
          }
        })
      );
    }
    //console.log('Volviendo del  en interceptor');
    console.log(req);

    return next.handle(req);

  }
}

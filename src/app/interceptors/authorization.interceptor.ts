import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { tap } from 'rxjs/operators';

@Injectable()

export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(private loginService : LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

      if (!req.url.includes('auth/login') && !req.url.includes('maps.googleapis.com')) {

      const secureReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${this.loginService.getToken() ? this.loginService.getToken() : localStorage.access_token}`)

      });
      return next.handle(secureReq).pipe(
        tap((event: any) => {
          if (event && event.url) {
          }
        })
      );
    }
    return next.handle(req);

  }
}

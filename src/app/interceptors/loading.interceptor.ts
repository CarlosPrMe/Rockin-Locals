import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingservice: LoadingService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    this.loadingservice.loading.next(true);
    return next.handle(req).pipe(
      tap((event: any) => {
        setTimeout(() => {
          this.loadingservice.loading.next(false);
        }, 3000);

      })

    );
  }

}

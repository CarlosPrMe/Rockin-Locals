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

   // debugger
    this.loadingservice.loading.next(true);
    console.log(this.loadingservice.loading.value);


    return next.handle(req).pipe(
      tap((event: any) => {
       // debugger;
        setTimeout(() => {
          this.loadingservice.loading.next(false);
          console.log(this.loadingservice.loading.value);
        }, 3000);

      })

    );
  }

}

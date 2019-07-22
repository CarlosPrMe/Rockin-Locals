import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class LoadingService {

  loading = new BehaviorSubject(undefined);


  constructor() {


  }

}

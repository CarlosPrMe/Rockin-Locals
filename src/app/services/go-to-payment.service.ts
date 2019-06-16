import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export class GoToPaymentGuard implements CanActivate{

  constructor(){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

    console.log(route);


    return true
  }

}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from '../services/login.service';


@Injectable({
  providedIn: 'root',
})
export class BandOnLine implements CanActivate {
  constructor(private loginservice: LoginService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.userType(url);
  }

  userType(url: string): boolean {
    if (this.loginservice.user && this.loginservice.user.value && this.loginservice.user.value.type && this.loginservice.user.value.type === 'band') { return true; }
    return false;
  }
}

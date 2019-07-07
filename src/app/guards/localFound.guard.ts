import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { LocalsService } from '../services/locals.service';


@Injectable({
  providedIn: 'root',
})
export class LocalFound implements CanActivate {
  constructor( private router: Router, private localService: LocalsService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.localFound(url);
  }

  localFound(url: string): boolean {
    if (this.localService.localSelected) { return true; }
    //this.router.navigate(['/index']);
    return false;
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ReservationsService } from '../services/reservations.service';


@Injectable({
  providedIn: 'root',
})
export class GoToPayment implements CanActivate {
  constructor(private reservation: ReservationsService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.reservationOn();
  }

  reservationOn(): boolean {
    if (this.reservation.currentReservation.value) { return true; }
    return false;
  }
}

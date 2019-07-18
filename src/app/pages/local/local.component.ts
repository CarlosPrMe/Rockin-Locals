import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalsService } from '../../services/locals.service';
import { LoginService } from '../../services/login.service';
import { ReservationsService } from '../../services/reservations.service';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.scss']
})
export class LocalComponent implements OnInit, OnDestroy {

  user;
  isUser;
  userData;
  isUserData;

  localSelected = this.localsService.localSelected

  constructor(private localsService: LocalsService, private loginsService: LoginService,
    private reservationsService: ReservationsService) {

      window.scrollTo({
        top: 0,
        left: 0,
      });

    this.isUser = this.loginsService.isLoged.subscribe((res) => this.user = res);

    this.isUserData = this.loginsService.user.subscribe((res) => { this.userData = res })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.isUser.unsubscribe();
    this.isUserData.unsubscribe();
  }


  onAskReservation(reser){
    this.reservationsService.currentReservation.next(reser)
  }
}

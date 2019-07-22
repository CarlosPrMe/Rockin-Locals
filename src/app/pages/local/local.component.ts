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

<<<<<<< HEAD
  constructor(private getLocalsService: GetLocalsService, private logginsService: LoggingService) {
    document.body.scrollTop = 0;

    this.isUser = this.logginsService.isLogged.subscribe((res) => this.user = res);

    this.isUserData = this.logginsService.user.subscribe((res) => { this.userData = res })
=======
  constructor(private localsService: LocalsService, private loginsService: LoginService,
    private reservationsService: ReservationsService) {

      window.scrollTo({
        top: 0,
        left: 0,
      });

    this.isUser = this.loginsService.isLoged.subscribe((res) => this.user = res);

    this.isUserData = this.loginsService.user.subscribe((res) => { this.userData = res })
>>>>>>> 11a671b5fa87856b770498d61a8c79ae823e5ff4
  }

  ngOnInit() {
  }

  ngOnDestroy() {
<<<<<<< HEAD
    this.isUser.unsubscribe();
    this.isUserData.unsubscribe();
=======
>>>>>>> 11a671b5fa87856b770498d61a8c79ae823e5ff4
  }


  onAskReservation(reser){
    this.reservationsService.currentReservation.next(reser)
  }
}

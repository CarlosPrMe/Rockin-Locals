import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalsService } from '../../services/locals.service';
import { LoggingService } from '../../services/logging.service';
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

  constructor(private localsService: LocalsService, private logginsService: LoggingService,
    private reservationsService: ReservationsService) {

    document.body.scrollTop = 0

    this.isUser = this.logginsService.isLogged.subscribe((res) => this.user = res);

    this.isUserData = this.logginsService.user.subscribe((res) => { this.userData = res })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.isUser.unsubscribe();
    this.isUserData.unsubscribe();
  }


  onAskReservation(reser){
    this.reservationsService.currentReservation.next(reser)
    console.log(reser);

  }
}

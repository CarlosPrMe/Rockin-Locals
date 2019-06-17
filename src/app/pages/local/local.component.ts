import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetLocalsService } from '../../services/getLocals.service';
import { LoggingService } from '../../services/logging.service';

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

  localSelected = this.getLocalsService.localSelected

  constructor(private getLocalsService: GetLocalsService, private logginsService: LoggingService) {
    document.body.scrollTop = 0;

    this.isUser = this.logginsService.isLogged.subscribe((res) => this.user = res);

    this.isUserData = this.logginsService.user.subscribe((res) => { this.userData = res })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.isUser.unsubscribe();
    this.isUserData.unsubscribe();
  }

}

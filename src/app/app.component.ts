import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { LoggingService } from './services/logging.service';
import { UserService } from './services/users.services';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges {
  title = 'Rockin Locals';
  user;
  showMenu: boolean; // Variable para mostral el menu
  showModal: boolean; // Variable para mostral la modal de registro
  userOnline;
  //hoy: NgbDate = this.ngCalendar.getToday();
  //pasado = { year: 2020, month: 5, day: 25 };

  constructor(private userService: UserService, private loggingService: LoggingService,
    private ngCalendar: NgbCalendar) {
    this.loggingService.user.subscribe(data => {
      this.user = data;
    })

    this.userOnline = this.loggingService.isLogged.subscribe(res => {
    })

    //console.log(this.hoy.after(this.pasado));
    //console.log(this.hoy.before(this.pasado));


  }

  ngOnInit() {

  }

  ngOnChanges() {

  }

  onShowMenu($event) {
    this.showMenu = !this.showMenu;
  }

  toggleModal($event) {
    this.showModal = !this.showModal;
  }

  onCloseSesion($event) {
    this.loggingService.logOut();
    alert('Hasta pronto')
  }

  onRegister(user) {
    this.userService.addUser(user).then(() => {
      alert('Bienvenido a Rockin Locals');
      this.toggleModal(user);
    })
  }

  onOpenSession(user) {
    this.loggingService.login(user.email, user.password).then((data) => {
    });
  }

}


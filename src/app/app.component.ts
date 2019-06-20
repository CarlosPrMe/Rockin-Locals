import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { LoggingService } from './services/logging.service';
import { UserService } from './services/users.services';
import { ScreenService } from './services/screen.service';
import { ScrollToService } from 'ng2-scroll-to-el';

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


  constructor(private userService: UserService, private loggingService: LoggingService,
    private screenService: ScreenService, private scrollService: ScrollToService) {

    this.loggingService.user.subscribe(data => {
      this.user = data;
    })

    this.userOnline = this.loggingService.isLogged.subscribe(res => {
    })


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
    let name = this.user.userName;
    this.loggingService.logOut();
    alert(`Hasta pronto ${name}`)
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

  //onResize($event) {
  //  this.screenService.resolution.next($event.target.innerWidth)
  //}


  scrollToTop(element) {
    this.scrollService.scrollTo(element);
  }

}


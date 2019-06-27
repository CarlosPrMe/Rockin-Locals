import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { LoginService } from './services/login.service';
import { UserService } from './services/users.services';
import { ScreenService } from './services/screen.service';
import { ScrollToService } from 'ng2-scroll-to-el';
import { LocationService } from './services/location.service';
import swal from 'sweetalert2';


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


  constructor(private userService: UserService, private loginService: LoginService,
    private screenService: ScreenService, private scrollService: ScrollToService,
    private locationService: LocationService) {

    this.loginService.user.subscribe(data => {
      this.user = data;
    })

    this.userOnline = this.loginService.isLoged.subscribe(res => {
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
    this.loginService.logOut();
  }

  async  onRegister(user) {
    if (user.city !== "" || user.address !== "" || user.postalCode !== "") {
      let location: any = await this.locationService.getLocation(user.city, user.address, user.postalCode)
      user.location = location.results[0].geometry.location;
    }
    this.userService.addUser(user).then((res: any) => {

      if (res.errors) {
        swal.fire({
          title: 'Error en el registro',
          text: 'Algo ha ido mal',
          type: "error",
          showConfirmButton: false,
        });
      } else {
        swal.fire({
          title: 'Bienvenido a Rockin Locals',
          text: 'Registro con éxito',
          type: "success",
          showConfirmButton: false,
        });

      }
      console.log(res);
      //debugger
      this.toggleModal(user);

    })
  }

  onOpenSession(user) {
    this.loginService.login(user.email, user.password).then((data) => {
    });
  }

  scrollToTop(element) {
    this.scrollService.scrollTo(element);
  }

}


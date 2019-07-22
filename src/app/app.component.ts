import { Component, Input, OnChanges, SimpleChanges, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { LoginService } from './services/login.service';
import { UserService } from './services/users.services';
import { ScreenService } from './services/screen.service';
import { ScrollToService } from 'ng2-scroll-to-el';
import { LocationService } from './services/location.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { OpenMenuService } from './services/openMenu.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges, OnDestroy {
  title = 'Rockin Locals';
  user;
  showMenu: boolean; // Variable para mostral el menu
  showModal: boolean; // Variable para mostral la modal de registro
  userOnline;

  @HostListener('document:click', ['$event'])

  clickout(event) {
    if(this.showMenu && event.target.className === "btn btn--access ng-star-inserted"){
    }
    else if (this.showMenu && event.target.className !== "btn btn--access" && event.target.className !== "dropdown dropdown-show"
      && event.target.classList[0] !== "form__control" && event.target.className !== "btn login"  && event.target.className !== "hamburguer__menu") {
     return this.openMenuService.changeMenuStatus();

    }

  }

  constructor(private userService: UserService, private loginService: LoginService,
    private screenService: ScreenService, private scrollService: ScrollToService,
    private locationService: LocationService, private router: Router,
    private openMenuService: OpenMenuService, private eRef: ElementRef) {

    if (localStorage.access_token) {

      this.loginService.checkUserLocalStorage(localStorage.access_token).then((res) => {
        this.loginService.user.next(res);
        this.loginService.isLoged.next(true);
        this.router.navigate(['/index']);
      })
    }



    this.loginService.user.subscribe(data => {
      this.user = data;
    })

    this.userOnline = this.loginService.isLoged.subscribe(res => {
    })

    this.openMenuService.showMenuBehavior.subscribe(data => {
      this.showMenu = data
    })
  }

  ngOnInit() {
  }

  ngOnChanges() {

  }

  ngOnDestroy() {
  }

  onShowMenu($event) {
    this.showMenu = this.openMenuService.changeMenuStatus()
  }

  toggleModal($event) {
    this.showModal = !this.showModal;
  }

  onCloseSesion($event) {
    let name = this.user.userName;
    this.loginService.logOut();
  }

  async  onRegister(user) {
    if (user.type === 'local') {
      let location: any = await this.locationService.getLocation(user.city, user.address, user.postalCode)
      if (location.results.length === 0) {
        this.toggleModal(true);
        return swal.fire({
          title: '¡Error en el registro!',
          type: "error",
          text: 'Ubicación errónea',
          showConfirmButton: false,
        })
      }
      user.location = location.results[0].geometry.location;
      user.city = this.getCleanedString(user.city);
    }

    this.userService.addUser(user).catch((err: any) => {
      if (err) {
        this.toggleModal(true);
        return swal.fire({
          title: 'Error en el registro',
          text: `${err.error}`,
          type: "error",
          showConfirmButton: false,
        });
      }
    }).then((res: any) => {
      if (res.status === 200) {
        swal.fire({
          title: 'Bienvenido a Rockin Locals',
          text: 'Registro con éxito',
          type: "success",
          showConfirmButton: false,
        });
        this.toggleModal(user);
      }
    })
  }

  onOpenSession(user) {
    this.loginService.login(user.email, user.password).then((data) => {
    });
  }

  scrollToTop(element) {

    this.scrollService.scrollTo(element);
  }

  getCleanedString(address) {
    let specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.";

    for (var i = 0; i < specialChars.length; i++) {
      address = address.replace(new RegExp("\\" + specialChars[i], 'gi'), '');
    }
    address = address.toLowerCase();
    address = address.replace(/á/gi, "a");
    address = address.replace(/é/gi, "e");
    address = address.replace(/í/gi, "i");
    address = address.replace(/ó/gi, "o");
    address = address.replace(/ú/gi, "u");
    address = address.replace(/ñ/gi, "n");
    return address;
  }

}


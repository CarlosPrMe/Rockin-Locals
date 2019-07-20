import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { LoginService } from './services/login.service';
import { UserService } from './services/users.services';
import { ScreenService } from './services/screen.service';
import { ScrollToService } from 'ng2-scroll-to-el';
import { LocationService } from './services/location.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';


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
    private locationService: LocationService, private router: Router) {

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

    this.userService.addUser(user).catch((err:any) => {
      debugger
      if (err) {
        debugger
        this.toggleModal(true);
        return swal.fire({
          title: 'Error en el registro',
          text: `${err.error}`,
          type: "error",
          showConfirmButton: false,
        });
      }
    }).then((res: any) => {
      debugger
      if (res.status === 200) {
        debugger
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

/*     if(this.screenService.resolution.value>768){
    }else{
      window.scrollTo({
        top: 1475,
        left: 0,

        behavior:'smooth'
      });
    } */
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


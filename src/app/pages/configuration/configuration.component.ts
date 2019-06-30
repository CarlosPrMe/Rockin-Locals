import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/users.services';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { LocalsService } from '../../services/locals.service';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  user;

  constructor(private loginService: LoginService, private userService: UserService,
    private router: Router, private activatedRoute: ActivatedRoute, private localService: LocalsService,
    private locationService: LocationService) {
    document.body.scrollTop = 0
  }


  ngOnInit() {
    this.loginService.user.subscribe((res) => {
      this.user = res;
    })
  }


  onEditUser(newData, user) {
    if(user.type === 'local'){
      debugger
      if(user.address !== newData.address || user.city !== newData.city || user.postalCode !== newData.postalCode ){
        this.locationService.getLocation(newData.city,newData.address,newData.postalCode).then((res:any)=>{
          debugger
          newData.location = res.results[0].geometry.location
        })
      }
    }
    user = Object.assign(user, newData)
    debugger
    this.userService.editUser(user).then((res: any) => {
      debugger
      if (res) {

        swal.fire({
          title: '¡Cambios realizados con éxito!',
          type: 'success',
          cancelButtonColor: '#be1e1e',
          confirmButtonText: 'Aceptar'
        })
      }
    }).then(result => {
      this.loginService.user.next(user);
      this.router.navigate(['/index']);
    })

  }

  onDeleteUser(id) {
    debugger;
    swal.fire({
      title: '¿Estás seguro de eliminar tu cuenta?',
      text: 'Se perderá toda la información',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#119e32',
      cancelButtonColor: '#be1e1e',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.value) {
        debugger
        this.userService.deleteUser(id).then((res: any) => {
          if (res.ok = 1) {
            swal.fire({
              title: '¡Eliminada!',
              text: 'Tu cuenta ha sido eliminada con éxito',
              type: 'success',
              timer: 2000,
              showConfirmButton: false,
            })
          }
          this.loginService.user.next(null);
          this.router.navigate(['/index']);
        })
      }
    })

  }
}


import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/users.services';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { LocalsService } from '../../services/locals.service';
import { LocationService } from '../../services/location.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  user;
  company = new BehaviorSubject(null);
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


 async onEditUser(newData, user) {
   if( await user.type === 'local'){
    this.company.next(user.companyName) ;
      debugger
      if(user.address !== newData.address || user.city !== newData.city || user.postalCode !== newData.postalCode ){
        this.locationService.getLocation(newData.city,newData.address,newData.postalCode).then((res:any)=>{
          debugger
          newData.location = res.results[0].geometry.location
        })
      }
      if(user.description !== newData.description){
        this.localService.getLocalsByLocal(newData.companyName).then((res)=>{
          debugger;
          const local =Object.assign(res[0]) ;
          local.description = newData.description;
          this.localService.editLocal(local).catch().then();
        })
      }
      if(this.company.value !== newData.companyName){
        this.localService.getLocalsByLocal(this.company.value).then((res)=>{
          debugger;
          const local =Object.assign(res[0], newData.companyName) ;
          this.localService.editLocal(local).catch().then();
        })
      }
    }
    user = await Object.assign(user, newData)
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
        if(this.user.type === 'local'){
          this.localService.deleteLocalByCompany(this.user.companyName).then((res:any)=>{
            debugger;

            if(res.ok !== 1){
              new Error('Local no encontrado');
            }
          })
        }
        this.userService.deleteUser(id).then((res: any) => {
          if (res.ok = 1) {
            swal.fire({
              title: '¡Eliminada!',
              text: 'Tu cuenta ha sido eliminada con éxito',
              type: 'success',
              timer: 2000,
              showConfirmButton: false,
            })
            localStorage.removeItem('access_token');
          }
          this.loginService.user.next(null);
          this.router.navigate(['/index']);
        })
      }
    })

  }
}


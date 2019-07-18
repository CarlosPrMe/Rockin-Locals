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
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }


  ngOnInit() {
    this.loginService.user.subscribe((res) => {
      this.user = res;
    })
  }


  async onEditUser(newData, user) {
    const currentUser = user;
    const currentLocal = { ...user };
    debugger
    if (user.type === 'local') {
      this.company.next(user.companyName);
      debugger
      if (user.address !== newData.address || user.city !== newData.city || user.postalCode !== newData.postalCode) {
        debugger
        let res: any = await this.locationService.getLocation(newData.city, newData.address, newData.postalCode)
        debugger
        if (res.results.length === 0 || !res) {
          this.loginService.user.next(currentLocal);
          this.router.navigate(['/index']);
          return swal.fire({
            title: '¡Error al editar usuario!',
            type: "error",
            showConfirmButton: false,
          })
        } else {
          newData.location = res.results[0].geometry.location
          let data: any = await this.localService.getLocalsByLocal(currentLocal._id)
          debugger
          if (!data) {
            this.loginService.user.next(currentLocal);
            debugger
            return swal.fire({
              title: '¡Error al hacer los cambios!',
              type: "error",
              showConfirmButton: false,
            })
          } else {
            debugger
            if(data.length === 1){
              const local = {...data[0],...newData };
              debugger
              let localEdited: any = await this.localService.editLocal(local)
              debugger
              if (!localEdited) {
                return swal.fire({
                  title: '¡Error al hacer los cambios!',
                  type: "error",
                  showConfirmButton: false,
                })
              }
            }
          }
        }
      }
      if (user.description !== newData.description) {
        debugger
        //let res: any = await this.localService.getLocalsByLocal(currentLocal.companyName)
        let res: any = await this.localService.getLocalsByLocal(currentLocal._id)
        debugger
        if (!res) {
          this.loginService.user.next(currentLocal);
          debugger
          return swal.fire({
            title: '¡Error al hacer los cambios!',
            type: "error",
            showConfirmButton: false,
          })
        } else {
          debugger
          if(res.length === 1){
            const local = res[0];
            local.description = newData.description;
            let localEdited: any = await this.localService.editLocal(local)
            debugger
            if (!localEdited) {
              return swal.fire({
                title: '¡Error al hacer los cambios!',
                type: "error",
                showConfirmButton: false,
              })
            }
          }
        }
      }
      if (this.company.value !== newData.companyName) {
        debugger
        //let local: any = await this.localService.getLocalsByLocal(this.company.value)
        let local: any = await this.localService.getLocalsByLocal(this.user._id)
        debugger
        if (!local) {
          this.loginService.user.next(currentLocal);
          this.router.navigate(['/index']);
          return swal.fire({
            title: '¡Error al editar usuario!',
            type: "error",
            showConfirmButton: false,
          })
        } else {
          debugger
          //const newLocal = Object.assign(local[0], newData.companyName);
          const newLocal = { ...local[0], ...newData };
          this.localService.editLocal(newLocal).catch().then();

        }
      }
      debugger
      let userNew = await { ...user, ...newData }
      let change: any = await this.userService.editUser(userNew)
      debugger
      if (!change) {
        debugger
        this.loginService.user.next(currentLocal);
        this.router.navigate(['/index']);
        return swal.fire({
          title: '¡Error al hacer los cambios!',
          type: "error",
          showConfirmButton: false,
        })
      } else {
        debugger
        this.loginService.user.next(change.data);
        this.router.navigate(['/index']);
        return swal.fire({
          title: '¡Cambios realizados con éxito!',
          type: 'success',
          showConfirmButton: false,
        })
      }

    }
    //Aqui empieza la edicion del usuario banda
    else {
      let userNew = { ...user, ...newData }
      debugger
      await this.userService.editUser(userNew).catch((err) => {
        debugger
        if (err) {
          debugger
          this.loginService.user.next(currentUser);
          this.router.navigate(['/index']);
          return swal.fire({
            title: '¡Error al hacer los cambios!',
            type: "error",
            showConfirmButton: false,
          })

        }
      }).then((res: any) => {
        if (res.data) {
          this.loginService.user.next(res.data);
          this.router.navigate(['/index']);
          swal.fire({
            title: '¡Cambios realizados con éxito!',
            type: 'success',
            showConfirmButton: false,
          })
        }
      })

    }


  }

  onDeleteUser(id) {
    debugger
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
        if (this.user.type === 'local') {
          debugger
          //this.localService.deleteLocalByCompany(this.user.companyName).catch(err => {
          this.localService.deleteLocalByCompany(id).catch(err => {
            debugger
            if (err) {
              this.router.navigate(['/index']);
              return swal.fire({
                title: '¡Error al hacer los cambios!',
                type: "error",
                showConfirmButton: false,
              })
            }
          })
        }
        debugger
        this.userService.deleteUser(id).catch(err => {
          debugger
          if (err) {
            this.router.navigate(['/index']);
            return swal.fire({
              title: '¡Error al hacer los cambios!',
              type: "error",
              showConfirmButton: false,
            })
          }
        }).then((res: any) => {
          debugger
          if (res.ok === 1) {
            swal.fire({
              title: '¡Eliminada!',
              text: 'Tu cuenta ha sido eliminada con éxito',
              type: 'success',
              timer: 2000,
              showConfirmButton: false,
            })
            localStorage.removeItem('access_token');
            this.loginService.user.next(null);
            this.router.navigate(['/index']);
          }
        })
      }
    })

  }
}


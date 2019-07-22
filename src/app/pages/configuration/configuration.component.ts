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
export class ConfigurationComponent implements OnInit, OnDestroy {

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

  ngOnDestroy(){
  }

  async onEditUser(newData, user) {
    const currentUser = user;
    const currentLocal = { ...user };
    if (user.type === 'local') {
      this.company.next(user.companyName);
      if (user.address !== newData.address || user.city !== newData.city || user.postalCode !== newData.postalCode) {
        let res: any = await this.locationService.getLocation(newData.city, newData.address, newData.postalCode)
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
          newData.city = this.getCleanedString(newData.city)
          let data: any = await this.localService.getLocalsByLocal(currentLocal._id)
          if (!data) {
            this.loginService.user.next(currentLocal);
            return swal.fire({
              title: '¡Error al hacer los cambios!',
              type: "error",
              showConfirmButton: false,
            })
          } else {
            if(data.length === 1){
              const local = {...data[0],...newData };
              let localEdited: any = await this.localService.editLocal(local)
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
        let res: any = await this.localService.getLocalsByLocal(currentLocal._id)
        if (!res) {
          this.loginService.user.next(currentLocal);
          return swal.fire({
            title: '¡Error al hacer los cambios!',
            type: "error",
            showConfirmButton: false,
          })
        } else {
          if(res.length === 1){
            const local = res[0];
            local.description = newData.description;
            let localEdited: any = await this.localService.editLocal(local)
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
        let local: any = await this.localService.getLocalsByLocal(this.user._id)
        if (!local) {
          this.loginService.user.next(currentLocal);
          this.router.navigate(['/index']);
          return swal.fire({
            title: '¡Error al editar usuario!',
            type: "error",
            showConfirmButton: false,
          })
        } else {
          const newLocal = { ...local[0], ...newData };
          this.localService.editLocal(newLocal).catch().then();

        }
      }
      let userNew = await { ...user, ...newData }
      let change: any = await this.userService.editUser(userNew)
      if (!change) {
        this.loginService.user.next(currentLocal);
        this.router.navigate(['/index']);
        return swal.fire({
          title: '¡Error al hacer los cambios!',
          type: "error",
          showConfirmButton: false,
        })
      } else {
        this.loginService.user.next(change.data);
        this.router.navigate(['/index']);
        return swal.fire({
          title: '¡Cambios realizados con éxito!',
          type: 'success',
          showConfirmButton: false,
        })
      }

    }
    else {
      let userNew = { ...user, ...newData }
      await this.userService.editUser(userNew).catch((err) => {
        if (err) {
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
        if (this.user.type === 'local') {
          this.localService.deleteLocalByCompany(id).catch(err => {
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
        this.userService.deleteUser(id).catch(err => {
          if (err) {
            this.router.navigate(['/index']);
            return swal.fire({
              title: '¡Error al hacer los cambios!',
              type: "error",
              showConfirmButton: false,
            })
          }
        }).then((res: any) => {
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


import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { customValidatorEmail } from '../modal/validators-custom';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit, OnChanges {

  myForm;
  user;
  @Input() showMenu: boolean;
  // @Input() user;
  @Input() login;
  @Output() showModal = new EventEmitter();
  @Output() navigate = new EventEmitter();
  @Output() closeSession = new EventEmitter();
  @Output() openSession = new EventEmitter();
  @Output() doScroll = new EventEmitter();


  constructor(private fb: FormBuilder, private loginService: LoginService) {
    this.loginService.user.subscribe((res) => {
      this.user = res;
    })
  };

  ngOnChanges(changes: SimpleChanges) {


  }

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ["", Validators.compose([Validators.required, customValidatorEmail])],
      password: ["", Validators.compose([Validators.required, Validators.minLength(8)])],
      sessionOpen: [""]
    })
  }

  submit($event, form) {
    debugger
    if (form.valid) {
      this.openSession.emit(form.value);
      form.reset();
    } else if (form.controls.email.errors && form.controls.email.errors.emailCustom) {
      return swal.fire({
        title: '¡Error en el login!',
        type: "error",
        text: 'Formato de email incorrecto',
        showConfirmButton: false,
      })
    } else if (form.controls.email.errors && form.controls.email.errors.required) {
      return swal.fire({
        title: '¡Error en el login!',
        type: "error",
        text: 'Necesario ingreso de email',
        showConfirmButton: false,
      })
    } else if (form.controls.password.errors && form.controls.password.value.length < 8) {
      return swal.fire({
        title: '¡Error en el login!',
        type: "error",
        text: 'Longitud de contraseña incorrecta (min. 8 caracteres)',
        showConfirmButton: false,
      })
    } else if (form.controls.password.errors && form.controls.password.errors.required) {
      return swal.fire({
        title: '¡Error en el login!',
        type: "error",
        text: 'Necesario ingreso de contraseña',
        showConfirmButton: false,
      })
    }
  }

  modal($event) {
    this.showModal.emit($event);
  }

  menu($event) {
    this.navigate.emit($event);
  }

  close($event) {
    this.closeSession.emit($event);
  }

  prueba(event) {
  }

  scroll(event) {
    this.doScroll.emit(event)
  }

}

/*     if (form.valid) {
      this.openSession.emit(form.value);
      form.reset();
    } else if (form.controls.email.errors) {
      swal.fire({
        title: '¡Error en el login!',
        type: "error",
        text: 'Formato de email incorrecto',
        showConfirmButton: false,
      })
    } else if (form.controls.password.errors) {
      swal.fire({
        title: '¡Error en el login!',
        type: "error",
        text: 'Logitud de contraseña incorrecta (Min 8 caracteres)',
        showConfirmButton: false,
      })
    } */

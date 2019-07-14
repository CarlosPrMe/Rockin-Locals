import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { customValidatorEmail } from '../modal/validators-custom';
import { LoginService } from '../../services/login.service';



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
    if (form.valid) {
      this.openSession.emit(form.value);
      form.reset();
    } else {
      alert('Formulario Incorrecto')
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

  prueba(event){
    console.log(event);

  }

  scroll(event){
    this.doScroll.emit(event)
  }

}

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { customValidatorEmail } from './validators-custom';
import { customValidatorUrl } from './validators-custom';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  myForm;
  @Input() showModal;
  @Output() closeModal = new EventEmitter();
  @Output() register = new EventEmitter();

  constructor(private fb: FormBuilder, private locationService: LocationService) { }

  close($event) {
    this.closeModal.emit($event);
    this.reset();
  }

  ngOnInit() {

    this.myForm = this.fb.group({

      type: ["band", Validators.required],
      userName: ["", Validators.compose([Validators.required, Validators.minLength(5)])],
      bandName: ["",],
      companyName: ["",],
      email: ["", Validators.compose([Validators.required, customValidatorEmail])],
      password: ["", Validators.compose([Validators.required, Validators.minLength(8)])],
      avatar: ["", Validators.compose([customValidatorUrl])],
      city: ["",],
      postalCode: ["",],
      address: ["",],
      terms: ["", Validators.required]
    })


  }



  submit($event, form) {

    debugger
    if (form.valid) {

      this.register.emit(form.value);
      form.reset();
      this.showModal = false;
    }

    this.reset()
  }

  formValues(form) {
    if (form.value.type === 'local') {
      this.myForm = this.fb.group({
        type: [form.value.type, Validators.required],
        userName: [form.value.userName, Validators.compose([Validators.required, Validators.minLength(5)])],
        bandName: ['',],
        companyName: [form.value.companyName, Validators.compose([Validators.required, Validators.minLength(5)])],
        email: [form.value.email, Validators.compose([Validators.required, customValidatorEmail])],
        password: [form.value.password, Validators.compose([Validators.required, Validators.minLength(8)])],
        avatar: [form.value.avatar, Validators.compose([customValidatorUrl])],
        city: [form.value.city, Validators.compose([Validators.required])],
        postalCode: [form.value.postalCode, Validators.compose([Validators.required])],
        address: [form.value.address, Validators.compose([Validators.required])],
        terms: [form.value.terms, Validators.required]
      })
    }
    if (form.value.type === 'band') {

      this.myForm = this.fb.group({
        type: [form.value.type, Validators.required],
        userName: [form.value.userName, Validators.compose([Validators.required, Validators.minLength(5)])],
        bandName: [form.value.bandName, Validators.compose([Validators.required])],
        companyName: [form.value.NamerName,],
        email: [form.value.email, Validators.compose([Validators.required, customValidatorEmail])],
        password: [form.value.password, Validators.compose([Validators.required, Validators.minLength(8)])],
        avatar: [form.value.avatar, Validators.compose([customValidatorUrl])],
        city: ["",],
        postalCode: ["",],
        address: ["",],
        terms: [form.value.terms, Validators.required]
      })
    }
    console.log(form);
  }


  reset() {
    this.myForm = this.fb.group({
      type: ["", Validators.required],
      userName: ["", Validators.compose([Validators.required, Validators.minLength(5)])],
      bandName: ["",],
      companyName: ["",],
      email: ["", Validators.compose([Validators.required, customValidatorEmail])],
      password: ["", Validators.compose([Validators.required, Validators.minLength(8)])],
      avatar: ["", Validators.compose([customValidatorUrl])],
      city: ["",],
      postalCode: ["",],
      address: ["",],
      terms: ["", Validators.required]
    })
  }

}

import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
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
    this.myForm.reset();
  }

  ngOnInit() {
    this.myForm = this.fb.group({

      type: ["", Validators.required],
      userName: ["", Validators.compose([Validators.required, Validators.minLength(5)])],
      bandName: ["",],
      companyName: ["",],
      email: ["", Validators.compose([Validators.required, customValidatorEmail])],
      password: ["", Validators.compose([Validators.required, Validators.minLength(8)])],
      avatar: ["",Validators.compose([customValidatorUrl])],
      city: ["",],
      postalCode: ["",],
      address: ["",],
      terms: ["", Validators.required]
    })
  }

  submit($event, form) {

    if (form.valid) {

      this.register.emit(form.value);
      form.reset();
      this.showModal = false;
    }
  }

}

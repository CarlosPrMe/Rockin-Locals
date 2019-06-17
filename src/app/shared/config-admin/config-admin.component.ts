import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { customValidatorEmail } from '../modal/validators-custom';


@Component({
  selector: 'app-config-admin',
  templateUrl: './config-admin.component.html',
  styleUrls: ['./config-admin.component.scss']
})
export class ConfigAdminComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  myForm;
  @Input() user;
  @Output() editUser = new EventEmitter();
  @Output() deleteUser = new EventEmitter();

  ngOnInit() {
    this.myForm = this.fb.group({
      userName: [``, Validators.compose([Validators.required, Validators.minLength(5)])],
      companyName: [``, Validators.required],
      description: [""],
      email: [``, Validators.compose([Validators.required, customValidatorEmail])],
      password: [``, Validators.compose([Validators.required, Validators.minLength(8)])],
      avatar: ["",],
      address: [""],
      postalCode: [""],
      city: [""],
    });

    if (!this.user.avatar) {
      this.user.avatar = null;
    }

    this.myForm.setValue({
      userName: this.user.userName,
      companyName: this.user.companyName,
      description: this.user.description,
      email: this.user.email,
      password: this.user.password,
      avatar: this.user.avatar,
      address: this.user.address,
      postalCode: this.user.postalCode,
      city: this.user.city,


    })



  }

  submit($event, form) {
    this.editUser.emit(form.value);
  }

  delete($event) {
    this.deleteUser.emit(this.user.id);
  }
}

import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { customValidatorEmail } from '../modal/validators-custom';
import { customValidatorUrl } from '../modal/validators-custom';


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

    if (!this.user.avatar) {
      this.user.avatar = null;
    }

    if(!this.user.description){
      this.user.description=' ';
    }

    this.myForm = this.fb.group({
      userName: [``, Validators.compose([Validators.required, Validators.minLength(5)])],
      companyName: [``, Validators.required],
      description: ["",Validators.maxLength(300)],
      //email: [``, Validators.compose([Validators.required, customValidatorEmail])],
      //password: [``,],
      avatar: ["",Validators.compose([customValidatorUrl])],
      address: [""],
      postalCode: [""],
      city: [""],
    });


    this.myForm.setValue({
      userName: this.user.userName,
      companyName: this.user.companyName,
      description: this.user.description,
      //email: this.user.email,
      //password: this.user.password,
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
    this.deleteUser.emit(this.user._id);
  }
}

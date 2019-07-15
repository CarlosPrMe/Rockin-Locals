import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { customValidatorEmail } from '../modal/validators-custom';
import { customValidatorUrl } from '../modal/validators-custom';


@Component({
  selector: 'app-config-user',
  templateUrl: './config-user.component.html',
  styleUrls: ['./config-user.component.scss']
})


export class ConfigUserComponent implements OnInit {

  myForm;
  @Input() user;
  @Output() editUser = new EventEmitter();
  @Output() deleteUser = new EventEmitter();

  constructor(private fb: FormBuilder) { }


  ngOnInit() {


    this.myForm = this.fb.group({
      userName: [``, Validators.compose([Validators.required, Validators.minLength(5)])],
      bandName: [``,Validators.required],
      //email: [``, Validators.compose([Validators.required, customValidatorEmail])],
      //password: [``, Validators.compose([Validators.required, Validators.minLength(8)])],
      avatar: ["",Validators.compose([customValidatorUrl])]
    })

    if (!this.user.avatar) {
      this.user.avatar = null;
    }


    this.myForm.setValue({
      userName: this.user.userName,
      bandName: this.user.bandName,
      //email: this.user.email,
      //password: this.user.password,
      avatar: this.user.avatar,

    })

  }

  submit($event, form) {

    this.editUser.emit(form.value);
  }

  delete($event) {

    this.deleteUser.emit(this.user._id);
  }

}

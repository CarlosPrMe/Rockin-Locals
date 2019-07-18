import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { customValidatorUrl } from '../modal/validators-custom';
import { LocalsService } from '../../services/locals.service';
import { Router } from '@angular/router';
import { LocalClass } from '../../mis clases/local';

@Component({
  selector: 'app-my-local',
  templateUrl: './my-local.component.html',
  styleUrls: ['./my-local.component.scss']
})
export class MyLocalComponent implements OnInit, OnChanges {

  @Input() user
  @Input() local;
  myForm;
  checked360 = false;
  checkedPano = false;
  show: boolean = true;
  @Output() updateLocal = new EventEmitter();
  @Output() deleteLocal = new EventEmitter();
  constructor(private fb: FormBuilder, private localservice: LocalsService,
    private router: Router) {

  }

  ngOnInit() {

    this.myForm = this.fb.group({
      checkDrum: [''],
      checkAmpGuit1: [''],
      checkAmpGuit2: [''],
      checkAmpBass: [''],
      checkKeyboard: [''],
      checkOthers: [''],
      name: [""],
      price: [""],
      imageType: [""],
      image: ["", Validators.compose([customValidatorUrl])],
      drum: [""],
      ampGuit1: [""],
      ampGuit2: [""],
      ampBass: [""],
      keyboard: [""],
      others: [""]
    })
  }

  ngOnChanges(simpleChanges: SimpleChanges) {

    if (this.local) {
      // this.show = false;
      if (!this.local.equipment.keyboard) {
        this.local.equipment.keyboard = '';
      }
      if (!this.local.equipment.others) {
        this.local.equipment.others = '';
      }

      if (this.local.imageType) {
        if (this.local.imageType === "360") {
          this.checked360 = true;
        }
        if (this.local.imageType === "panoramic") {
          this.checkedPano = true;
        }

      } else {
        this.local.imageType = '';
      }

      if (this.local.equipment.drum) {
        this.local.equipment.checkDrum = true;
      } else {
        this.local.equipment.checkDrum = false;
      }
      if (this.local.equipment.ampGuit1) {
        this.local.equipment.checkAmpGuit1 = true;
      } else {
        this.local.equipment.checkAmpGuit1 = false;
      }
      if (this.local.equipment.ampGuit2) {
        this.local.equipment.checkAmpGuit2 = true;
      } else {
        this.local.equipment.checkAmpGuit2 = false;
      }
      if (this.local.equipment.ampBass) {
        this.local.equipment.checkAmpBass = true;
      } else {
        this.local.equipment.checkAmpBass = false;
      }
      if (this.local.equipment.keyboard) {
        this.local.equipment.checkKeyboard = true;
      } else {
        this.local.equipment.checkKeyboard = false;
      }
      if (this.local.equipment.others) {
        this.local.equipment.checkOthers = true;
      } else {
        this.local.equipment.checkOthers = false;
      }

      this.myForm.setValue({
        checkDrum: this.local.equipment.checkDrum,
        checkAmpGuit1: this.local.equipment.checkAmpGuit1,
        checkAmpGuit2: this.local.equipment.checkAmpGuit2,
        checkAmpBass: this.local.equipment.checkAmpBass,
        checkKeyboard: this.local.equipment.checkKeyboard,
        checkOthers: this.local.equipment.checkOthers,
        name: this.local.name,
        price: this.local.price,
        imageType: this.local.imageType,
        image: this.local.image,
        drum: this.local.equipment.drum,
        ampGuit1: this.local.equipment.ampGuit1,
        ampGuit2: this.local.equipment.ampGuit2,
        ampBass: this.local.equipment.ampBass,
        keyboard: this.local.equipment.keyboard,
        others: this.local.equipment.others
      })
    }
    else {
      //this.show = true;
    }
  }

   scroll($event) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior:'smooth'
    })
   }


  submit(event, form, currentUser) {

    let UpdatedLocal = {}

    let local = new LocalClass();
    let equipment = {
      drum: form.value.drum,
      ampGuit1: form.value.ampGuit1,
      ampGuit2: form.value.ampGuit2,
      ampBass: form.value.ampBass,
      keyboard: form.value.keyboard,
      others: form.value.others
    }

    local.city = currentUser.city;
    local.postalCode = currentUser.postalCode;
    local.address = currentUser.address;
    local.name = form.value.name;
    local.location = currentUser.location;
    local.equipment = equipment;
    local.image = form.value.image;
    local.price = form.value.price;
    local.companyName = currentUser.companyName;
    local.imageType = form.value.imageType;
    local.description = currentUser.description;
    local.companyId = currentUser._id;

    UpdatedLocal = local
    if (this.local) {
      UpdatedLocal = Object.assign(this.local, local)
    }
    this.updateLocal.emit(UpdatedLocal);
  }

  delete(id) {
    this.deleteLocal.emit(id)
  }
}



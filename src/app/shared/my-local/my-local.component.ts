import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LocalsService } from '../../services/locals.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-local',
  templateUrl: './my-local.component.html',
  styleUrls: ['./my-local.component.scss']
})
export class MyLocalComponent implements OnInit, OnChanges {

  @Input() user
  @Input() local;
  myForm;
  show: boolean = false;
  constructor(private fb: FormBuilder, private localservice: LocalsService,
    private router: Router) {

  }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ["nadad"],
      price: [""],
      imageType: [""],
      image: [""],
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
      if (!this.local.equipment.keyboard) {
        this.local.equipment.keyboard = "";
      }
      if (!this.local.equipment.others) {
        this.local.equipment.others = "";
      }


      this.myForm.setValue({
        name: this.local.name,
        price: this.local.price,
        imageType: [""],
        image: this.local.image,
        drum: this.local.equipment.drum,
        ampGuit1: this.local.equipment.ampGuit1,
        ampGuit2: this.local.equipment.ampGuit2,
        ampBass: this.local.equipment.ampBass,
        keyboard: this.local.equipment.keyboard,
        others: this.local.equipment.others
      })
    }
  }

  showLocal($event) {
    this.show = !this.show;
  }


  submit(event, form) {
    console.log(form.value);
    //this.show = !this.show;
    //this.localservice.editLocal(form.value).then((data)=>console.log(data))
    this.router.navigateByUrl('index')



  }
}

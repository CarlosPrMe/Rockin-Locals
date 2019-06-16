import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoggingService } from '../../services/logging.service';

@Component({
  selector: 'app-my-local',
  templateUrl: './my-local.component.html',
  styleUrls: ['./my-local.component.scss']
})
export class MyLocalComponent implements OnInit {

  @Input() user
  myForm;
  constructor(private fb: FormBuilder) {   }
  show: boolean = false;

  ngOnInit() {
    this.myForm = this.fb.group({
      name:[""],
      price:[""],
      imageType:[""],
      image:[""],
      drum: [""],
      ampGuit1:[""],
      ampGuit2:[""],
      ampBass:[""],
      keyboard:[""],
      others:[""]
    })
    this.myForm.setValue({
      nameLocal:this.user.name,
      price:this.user.price,
      imageType:this.user.imageType,
      image:this.user.image,
      drum: this.user.drum,
      ampGuit1:this.user.ampGuit1,
      ampGuit2:this.user.ampGuit2,
      ampBass:this.user.ampBass,
      keyboard:this.user.keyboard,
      others:this.user.others
    })



  }

  showLocal($event) {
    this.show = !this.show;
    this.myForm.reset();
  }


  submit(event,form){
    console.log(form.value);
    this.show = !this.show;

  }
}

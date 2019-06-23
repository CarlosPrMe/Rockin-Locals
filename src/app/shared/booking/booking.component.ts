import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TestService } from '../../services/test.service';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  myForm;
  showBookin;
  @Input() localSelected;
  @Output() hideBookin = new EventEmitter();
  @Output() bookin = new EventEmitter();
  constructor(private fb: FormBuilder, private testService: TestService) { }

  ngOnInit() {

    this.myForm = this.fb.group({
      date: ["", Validators.required],
      hourIn: ["", Validators.required],
      hoursNumber: ["", Validators.required],
      drum: [""],
      ampGuit1: [""],
      ampGuit2: [""],
      ampBass: [""],
      speakers: [""]
    })
  }

  submit(form) {
    console.log(form.value, this.localSelected);
    this.bookin.emit(form.value);
    this.testService.bookin= form.value;

    //if(form.valid){
    //  alert('Formulario OK');
    //}else {
    //  alert('Formulario incorrecto');
    //}

  }

  cancel($event) {
    this.hideBookin.emit($event);
    this.myForm.reset()
  }
}

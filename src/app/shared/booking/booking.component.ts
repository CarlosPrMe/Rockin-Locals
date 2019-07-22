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
    this.bookin.emit(form.value);
    this.testService.bookin= form.value;
  }

  cancel($event) {
    this.hideBookin.emit($event);
    this.myForm.reset()
  }
}

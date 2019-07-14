import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';


@Component({
  selector: 'app-searcher-input',
  templateUrl: './searcher_input.component.html',
  styleUrls: ['./searcher_input.component.scss']
})

export class SearcherInputComponent implements OnInit {

  myForm;


  @Output() searchData = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      place: [""]
    })
  }


  submit($event, form) {

    if (form.value.place.length < 2) {
       ;
      swal.fire({
        title: 'Introduce una ciudad o C.P. válido',
        type: "warning",
        showConfirmButton: false,
      });

    } else {
      this.searchData.emit(form.value.place);
    }
    form.reset();
  }


}

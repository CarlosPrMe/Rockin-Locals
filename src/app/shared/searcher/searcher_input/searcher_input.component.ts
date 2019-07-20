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
      this.searchData.emit(this.getCleanedString(form.value.place));
      //this.searchData.emit(form.value.place);
    }
    form.reset();
  }


  getCleanedString(city) {
    let specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.";

    for (var i = 0; i < specialChars.length; i++) {
      city = city.replace(new RegExp("\\" + specialChars[i], 'gi'), '');
    }
    city = city.toLowerCase();
    city = city.replace(/á/gi, "a");
    city = city.replace(/é/gi, "e");
    city = city.replace(/í/gi, "i");
    city = city.replace(/ó/gi, "o");
    city = city.replace(/ú/gi, "u");
    city = city.replace(/ñ/gi, "n");
    return city;
  }

}

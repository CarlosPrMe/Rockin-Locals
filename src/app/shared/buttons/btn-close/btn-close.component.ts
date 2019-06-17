import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-btn-close',
  templateUrl: './btn-close.component.html',
  styleUrls: ['./btn-close.component.scss']
})

export class BtnCloseComponent {
  @Output() closeModal = new EventEmitter

  close($event){
    this.closeModal.emit($event);
  }
}

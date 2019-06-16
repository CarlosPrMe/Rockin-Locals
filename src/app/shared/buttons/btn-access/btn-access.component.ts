import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-btn-access',
  templateUrl: './btn-access.component.html',
  styleUrls: ['./btn-access.component.scss'],
})

export class BtnAccessComponent {

  @Input() login:boolean;
  status: boolean = false;

  @Output() showMenu = new EventEmitter();

  menu($event) {
    this.showMenu.emit();
  }
}


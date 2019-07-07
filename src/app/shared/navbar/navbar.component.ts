import { Component, Output, EventEmitter, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})

export class NavbarComponent implements OnInit, OnChanges {

  constructor() { }
  @Input() userOnline;
  @Input() user;
  @Input() login;
  @Output() showMenu = new EventEmitter();


  ngOnChanges(changes: SimpleChanges) {
    //debugger
    //console.log(changes);
  }

  ngOnInit() {

  }


  menu($event) {
    this.showMenu.emit($event);
  }

}



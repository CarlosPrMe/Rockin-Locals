import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-local',
  templateUrl: './header-local.component.html',
  styleUrls: ['./header-local.component.scss']
})
export class HeaderLocalComponent implements OnInit {

  @Input() user;
  @Input() localSelected;
  constructor() { }

  ngOnInit() {
  }

}

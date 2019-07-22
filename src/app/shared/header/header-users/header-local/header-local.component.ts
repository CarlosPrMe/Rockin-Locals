import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-header-local',
  templateUrl: './header-local.component.html',
  styleUrls: ['./header-local.component.scss']
})
export class HeaderLocalComponent implements OnInit, OnChanges {

  @Input() user;
  @Input() localSelected;
  showDescription: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(change: SimpleChanges) {
    change
    if (change.user && change.user.currentValue && change.user.currentValue.description) {
      setTimeout(() => {
        this.showDescription = true

      }, 150);
    } else if (!change.user || !change.user.currentValue || !change.user.currentValue.description) {
      setTimeout(() => {
        this.showDescription = false
      }, 150);
    }
  }

}

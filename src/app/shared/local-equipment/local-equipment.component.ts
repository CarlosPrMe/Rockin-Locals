import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-local-equipment',
  templateUrl: './local-equipment.component.html',
  styleUrls: ['./local-equipment.component.scss']
})
export class LocalEquipmentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() localSelected

}

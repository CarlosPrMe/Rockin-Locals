import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.html',
  styleUrls: ['./map.scss']
})

export class MapComponent implements OnChanges {

  lat: number = 40.43;
  lng: number = -3.70;
  text: string;
  labelOptions;

  @Input() localsFound;

  constructor() { }

  ngOnChanges(change: SimpleChanges) {

    if (this.localsFound) {

      this.lat = change.localsFound.currentValue[0].location.lat;
      this.lng = change.localsFound.currentValue[0].location.lng;

    }
  }

}

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.html',
  styleUrls: ['./map.scss']
})

export class MapComponent implements OnChanges {

  lat: number = 40.43;
  lng: number = -3.70;

  @Input() localsFound;

  constructor() { }

  ngOnChanges(change: SimpleChanges) {

    if (this.localsFound) {
      this.lat = change.localsFound.currentValue[0].location.lat;
      this.lng = change.localsFound.currentValue[0].location.lng;

      /*       console.log(change);

            change.localsFound.currentValue.forEach(local => {
              this.labelOptions.text = `${local.companyName}`;
              console.log(local);
            }); */
    }

  }

  /*   icon = {
      url: 'https://banner2.kisspng.com/20180320/sye/kisspng-map-computer-icons-clip-art-map-red-pin-png-5ab1ace847e833.8823323815215935762945.jpg',

  } */

  /* icon = {
    url: 'http://www.ser-transparente.es/images/casa-png-transparente_8.jpg',
  } */

  labelOptions = {
    display: 'block',
    color: '#621e81',
    border: '2px solid #fff',
    fontFamily: '',
    fontSize: '20px',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
  }

}

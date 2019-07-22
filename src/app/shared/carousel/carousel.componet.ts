
import {Component} from '@angular/core';
import { ScreenService } from '../../services/screen.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.componet.html',
  styleUrls: ['./carousel.componet.scss'],
})

export class CarouselComponent  {

  items: Array<any> = []
  width;
  constructor(private screenService: ScreenService) {

      if(this.screenService.resolution.value > 1024){
        this.width = '900'
      }
      else if(this.screenService.resolution.value > 768 && this.screenService.resolution.value < 1024 ){
        this.width = '500'
      }
      else if(this.screenService.resolution.value < 768 ){
        this.width = '250'
      }

    this.items = [
      { name: '../../../assets/img/carrousel.jpg' },
      { name: '../../../assets/img/carrousel.jpg' },
      { name: '../../../assets/img/carrousel.jpg' },
      { name: '../../../assets/img/carrousel.jpg' },
      { name: '../../../assets/img/carrousel.jpg' },
      { name: '../../../assets/img/carrousel.jpg' },
      { name: '../../../assets/img/carrousel.jpg' },
      { name: '../../../assets/img/carrousel.jpg' },
      { name: '../../../assets/img/carrousel.jpg' },
      { name: '../../../assets/img/carrousel.jpg' },
      { name: '../../../assets/img/carrousel.jpg' },


    ]
  }
}

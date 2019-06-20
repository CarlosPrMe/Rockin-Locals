import { Component } from '@angular/core';
import { LocalsService } from '../../services/locals.service';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})

export class SearcherComponent {

  constructor( private localsService: LocalsService) { }

  localsFound;
  showInfo;

  showData(local) {
    console.log(local);

    this.localsService.getLocalsByCity(local).then((data:Array<any>)=> {
      if (data.length === 0) {
        alert('No hay locales de ensayo en esa ubicación');
        this.localsFound = null;
        this.showInfo = false

        return null;
      }else{
        this.showInfo = true;
        this.localsFound = data;
      }
      console.log(data)
    })

  }


}


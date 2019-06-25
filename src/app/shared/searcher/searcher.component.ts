import { Component } from '@angular/core';
import { LocalsService } from '../../services/locals.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})

export class SearcherComponent {

  constructor(private localsService: LocalsService) { }

  localsFound;
  showInfo;

  showData(local) {
    if (!isNaN(+local)) {
      local = +local
    } else {
      local = local;
    }
    //console.log(local);

    this.localsService.getLocalsByCity(local).then((data: Array<any>) => {
      if (data.length === 0) {
        swal.fire({
          title: 'Lo sentimos. No hay locales de ensayo en esa ubicación',
          text: 'Introduce una nueva dirección en el buscador',
          type: "warning",
          showConfirmButton: false,
        })
        this.localsFound = null;
        this.showInfo = false
        return null;
      } else {
        this.showInfo = true;
        this.localsFound = data;
      }
      //console.log(data)
    })
  }
}


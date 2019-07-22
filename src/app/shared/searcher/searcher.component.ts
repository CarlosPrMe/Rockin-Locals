import { Component, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { LocalsService } from '../../services/locals.service';
import swal from 'sweetalert2';
import { LoadingService } from 'src/app/services/loading.service';



@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})

export class SearcherComponent implements OnInit, OnChanges, OnDestroy {

  constructor(private localsService: LocalsService,
    private loadingService: LoadingService) { }

  localsFound;
  showInfo;
  loading
  scroll;

  ngOnInit() {
  }

  ngOnChanges(simpleChange: SimpleChanges) {

    this.loadingService.loading.subscribe((res) => {

      this.loading = res
    })
  }

  ngOnDestroy(){

  }

  showData(local) {
    this.localsService.getLocalsByCity(local).catch((err)=> {
      if(err){
        this.localsFound = null;
        this.showInfo = false
        swal.fire({
          title: 'Lo sentimos. Ha habido un error',
          text: 'Introduce una nueva dirección en el buscador',
          type: "warning",
          showConfirmButton: false,
        })
        return null;
      }
    }).then((data: Array<any>) => {
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
    })
  }
}


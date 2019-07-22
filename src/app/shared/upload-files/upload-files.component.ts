import { Component, OnInit } from '@angular/core';
import { UploadImageService } from '../../services/upload.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {


  constructor(private uploadImage: UploadImageService) { }

  ngOnInit() {
  }

  public respuestaImagenEnviada;
  public resultadoCarga;
  public upLoading(files: FileList) {
    this.uploadImage.uploadImage(files[0]).subscribe(
      (response) => {
        this.respuestaImagenEnviada = response;
        if (this.respuestaImagenEnviada <= 1) {
        } else {
          if (this.respuestaImagenEnviada.code == 200 && this.respuestaImagenEnviada.status == "success") {
            this.resultadoCarga = 1;
          } else {
            this.resultadoCarga = 2;
          }
        }
      },
      error => {
      }
    );   //FIN DE METODO SUBSCRIBE

  }


}


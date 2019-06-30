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
    console.log(files);

    this.uploadImage.uploadImage(files[0]).subscribe(


      (response) => {
console.log(response);

        debugger

        this.respuestaImagenEnviada = response;
        if (this.respuestaImagenEnviada <= 1) {
          console.log("Error en el servidor");
        } else {
          if (this.respuestaImagenEnviada.code == 200 && this.respuestaImagenEnviada.status == "success") {

            this.resultadoCarga = 1;
          } else {
            this.resultadoCarga = 2;
          }

        }
      },
      error => {
        console.log(<any>error);
      }
    );   //FIN DE METODO SUBSCRIBE

  }


}


import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';



@Injectable()

export class UploadImageService {

  constructor(private httpClient: HttpClient) { }

  uploadImage(image: File) {

    const formData = new FormData();
    formData.append('multer.route', image, image.name);

    console.log('enviando');
    console.log(formData);


    return this.httpClient.post(`${environment.apiUrl}/uploads`, image);
  }


}


import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';


@Injectable()

export class LogginFakeInterceptor implements HttpInterceptor {

  myUsers = [
    {
      id: 1, //user de banda
      type: 'band',
      userName: 'Carlos Prieto',
      bandName: 'Linkin Park',
      email: 'carlospm86@gmail.com',
      password: 'carlospm86',
      avatar: 'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1',
      terms: true,
      favourites: [
       // {
       //   companyName:'Pika Studios',
       //   companyId:2,
       //   localName:'Local 1',
       // },
        {
          companyName:'GustaRock',
          companyId: '5d10cefb2e919d314c494770' ,
          localName:'Local 3',
        },
      ]

    },
    {
      id: 2, //user de local
      type: 'local',
      userName: 'Enrique Herreria',
      companyName: 'Pika Studios',
      email: 'carlospm87@gmail.com',
      password: 'carlospm87',
     // avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdZJR0V-0Gj4v1fYHNoYvF0zHUqKK9q0CnMN8-_ve9AcX1nJUx',
      terms: true,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut vel suscipit molestias nisi, adipisci earum accusamus possimus labore est, dolor magnam, cum exercitationem! Ea dolore eligendi molestias alias asperiores non.',
      address: 'Avenida de los Metales, 16',
      city: 'Leganés',
      postalCode: '28914',
      equipment: {
      },
      location: {
        lat: 40.4268965528878,
        lng: -3.7015234947205045
      },
    },

  ];


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'POST' && req.url.includes('auth/login')) {
      const user = req.body;
      const found = this.myUsers.findIndex(u => u.email === user.email && u.password === user.password);
      if (found > -1) {
        return of(new HttpResponse(
          { status: 200, body: { access_token: 'LogginFAke', user: this.myUsers[found] } }))
      }

      return throwError(new HttpErrorResponse({ status: 401 }))
    }
    return next.handle(req);
  }
}


/* {
  "id": "2",
  "city": "Getafe",
  "postalCode": 28080,
  "address": "Calle Prueba, 5",
  "Location": {},
  "name": "Local 5",
  "image": "https://www.bonzolocalesdeensayo.com/wp-content/uploads/2015/06/sala1-the-cavern-bonzo-locales-de-ensayo-1.jpg",
  "price": 6,
  "equipment": {
      "drum": "Batería Tama SuperStar",
      "ampGuit1": "Amplificador de guitarra Mesa Booggie",
      "ampGuit2": "Amplificador de guitarra Line6",
      "ampBass": "Amplificador de bajo Ampeg",
      "speakers": "Equipo de voz Berhinger"
  },
  "location": {
      "lat": 40.43173133457571,
      "lng": -3.7015234947205045
  }
},
{
  "id": "3",
  "city": "Madrid",
  "postalCode": "28080",
  "address": "Calle Los palotes,15",
  "Location": {},
  "name": "Local 2",
  "image": "https://www.bonzolocalesdeensayo.com/wp-content/uploads/2015/06/sala1-the-cavern-bonzo-locales-de-ensayo-1.jpg",
  "price": 14,
  "equipment": {
      "drum": "Batería Tama SuperStar",
      "ampGuit1": "Amplificador de guitarra Mesa Booggie",
      "ampGuit2": "Amplificador de guitarra Line6",
      "ampBass": "Amplificador de bajo Ampeg",
      "speakers": "Equipo de voz Berhinger"
  },
  "location": {
      "lat": 40.43173133457571,
      "lng": -3.695172023773239
  },
  "localName": "Local 2",
  "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut vel suscipit molestias nisi, adipisci earum accusamus possimus labore est, dolor magnam, cum exercitationem! Ea dolore eligendi molestias alias asperiores non.",
  "type": "local",
  "email": "carlospm87@gmail.com",
  "password": "carlospm87",
  "companyName": "GustaRock",
  "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdZJR0V-0Gj4v1fYHNoYvF0zHUqKK9q0CnMN8-_ve9AcX1nJUx"
},
{
  "id": "4",
  "city": "Madrid",
  "postalCode": "28080",
  "address": "Calle perdida, 40",
  "Location": {},
  "name": "Local 8",
  "image": "https://www.bonzolocalesdeensayo.com/wp-content/uploads/2015/06/sala1-the-cavern-bonzo-locales-de-ensayo-1.jpg",
  "price": 16,
  "equipment": {
      "drum": "Batería Tama SuperStar",
      "ampGuit1": "Amplificador de guitarra Mesa Booggie",
      "ampGuit2": "Amplificador de guitarra Line6",
      "ampBass": "Amplificador de bajo Ampeg",
      "speakers": "Equipo de voz Berhinger"
  },
  "localName": "Ritmo & Compas",
  "description": "Ut vel suscipit molestias nisi, adipisci earum accusamus possimus labore est, dolor magnam, cum exercitationem! Ea dolore eligendi molestias alias asperiores non.",
  "location": {
      "lat": 40.43094733953524,
      "lng": -3.710449886322067
  }
},
{
  "id": "5",
  "city": "Leganés",
  "postalCode": "28914",
  "address": "Av. de los Metales, 16",
  "Location": {},
  "name": "Local 1",
  "image": "https://www.bonzolocalesdeensayo.com/wp-content/uploads/2015/06/sala1-the-cavern-bonzo-locales-de-ensayo-1.jpg",
  "price": 9,
  "equipment": {
      "drum": "Batería Tama SuperStar",
      "ampGuit1": "Amplificador de guitarra Mesa Booggie",
      "ampGuit2": "Amplificador de guitarra Line6",
      "ampBass": "Amplificador de bajo Ampeg",
      "speakers": "Equipo de voz Berhinger"
  },
  "location": {
      "lat": "40.3284448",
      "lng": "-3.776268,15"
  },
  "companyName": "Pika Studios"
},
{
  "id": "6",
  "city": "Leganés",
  "postalCode": "28914",
  "address": "Poligono industrial M-50 Sur, Nave 3, 34",
  "Location": {},
  "name": "Local 3",
  "image": "https://www.bonzolocalesdeensayo.com/wp-content/uploads/2015/06/sala1-the-cavern-bonzo-locales-de-ensayo-1.jpg",
  "price": 9,
  "equipment": {
      "drum": "Batería Mapex Classic",
      "ampGuit1": "Amplificador de guitarra Fender Custom",
      "ampGuit2": "Amplificador de guitarra Marshall JCM100",
      "ampBass": "Amplificador de bajo Warwick",
      "speakers": "Equipo de voz Mackie 200Watt"
  },
  "location": {
      "lat": "40.3057935",
      "lng": "-3.8081172,17"
  },
  "companyName": "Gustarock"
} */

import { Injectable, } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Subject, BehaviorSubject, Observable } from "rxjs";

@Injectable()

export class TestService {

  constructor(private httpClient: HttpClient) { }

  reservas = [
    {
      day: '10/02/2019',
      place: 'Ritmo & Compas',
      local: 'Local 10',
      hour: '18.00'
    },
    {
      day: '12/02/2019',
      place: 'Pika',
      local: 'Local 12',
      hour: '19.00'
    },
    {
      day: '10/02/2019',
      place: 'Ritmo & Compas',
      local: 'Local 10',
      hour: '18.00'
    },
    {
      day: '10/02/2019',
      place: 'Ritmo & Compas',
      local: 'Local 10',
      hour: '18.00'
    },
    {
      day: '10/02/2019',
      place: 'Ritmo & Compas',
      local: 'Local 10',
      hour: '18.00'
    },
  ]

  users = [
    {
      id: 1,
      type: 'band',
      name: 'Carlos',
      bandName: 'Los palurdos',
      email: 'carlospm86@gmail.com',
      password: 'carlospm86',
      avatar: 'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1',
      terms: true

    },
    {
      id: 2,
      type: 'band',
      name: 'Pepito',
      bandName: 'Los palurdos',
      email: 'carlospm87@gmail.com',
      password: 'carlospm87',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdZJR0V-0Gj4v1fYHNoYvF0zHUqKK9q0CnMN8-_ve9AcX1nJUx',
      terms: true

    }
  ];

  locals = [
    {
      id: 1,
      city: 'Leganés',
      postalCode: '28080',
      address: 'Calle Gran vía, 2',
      location: {
        lat: 40.4268965528878,
        lng: -3.7015234947205045
      },
      localName: 'GustaRock',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut vel suscipit molestias nisi, adipisci earum accusamus possimus labore est, dolor magnam, cum exercitationem! Ea dolore eligendi molestias alias asperiores non.',
      name: 'Local 1',
      image: 'https://www.bonzolocalesdeensayo.com/wp-content/uploads/2015/06/sala1-the-cavern-bonzo-locales-de-ensayo-1.jpg',
      price: 25,
      equipment: {
        drum: 'Batería Tama SuperStar',
        ampGuit1: 'Amplificador de guitarra Mesa Booggie',
        ampGuit2: 'Amplificador de guitarra Line6',
        ampBass: 'Amplificador de bajo Ampeg',
        speakers: 'Equipo de voz Berhinger'
      },
    },
    {
      id: 2,
      city: 'Getafe',
      postalCode: '28080',
      address: 'Calle Prueba, 5',
      location: {
        lat: 40.43173133457571,
        lng: -3.7015234947205045
      },
      localName: 'Rock & Pop',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut vel suscipit molestias nisi, adipisci earum accusamus possimus labore est, dolor magnam, cum exercitationem! Ea dolore eligendi molestias alias asperiores non.',
      name: 'Local 5',
      image: 'https://www.bonzolocalesdeensayo.com/wp-content/uploads/2015/06/sala1-the-cavern-bonzo-locales-de-ensayo-1.jpg',
      price: 6,
      equipment: {
        drum: 'Batería Tama SuperStar',
        ampGuit1: 'Amplificador de guitarra Mesa Booggie',
        ampGuit2: 'Amplificador de guitarra Line6',
        ampBass: 'Amplificador de bajo Ampeg',
        speakers: 'Equipo de voz Berhinger'
      },
    },
    {
      id: 3,
      city: 'Madrid',
      postalCode: '28080',
      address: 'Calle Los palotes,15',
      location: {
        lat: 40.43173133457571,
        lng: -3.695172023773239
      },
      localName: 'Pika Studios',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut vel suscipit molestias nisi, adipisci earum accusamus possimus labore est, dolor magnam, cum exercitationem! Ea dolore eligendi molestias alias asperiores non.',
      name: 'Local 2',
      image: 'https://www.bonzolocalesdeensayo.com/wp-content/uploads/2015/06/sala1-the-cavern-bonzo-locales-de-ensayo-1.jpg',
      price: 14,
      equipment: {
        drum: 'Batería Tama SuperStar',
        ampGuit1: 'Amplificador de guitarra Mesa Booggie',
        ampGuit2: 'Amplificador de guitarra Line6',
        ampBass: 'Amplificador de bajo Ampeg',
        speakers: 'Equipo de voz Berhinger'
      },
    },
    {
      id: 4,
      city: 'Madrid',
      localName: 'Ritmo & Compas',
      description: 'Ut vel suscipit molestias nisi, adipisci earum accusamus possimus labore est, dolor magnam, cum exercitationem! Ea dolore eligendi molestias alias asperiores non.',
      postalCode: '28080',
      address: 'Calle perdida, 40',
      location: {
        lat: 40.43094733953524,
        lng: -3.710449886322067
      },
      name: 'Local 8',
      image: 'https://www.bonzolocalesdeensayo.com/wp-content/uploads/2015/06/sala1-the-cavern-bonzo-locales-de-ensayo-1.jpg',
      price: 16,
      equipment: {
        drum: 'Batería Tama SuperStar',
        ampGuit1: 'Amplificador de guitarra Mesa Booggie',
        ampGuit2: 'Amplificador de guitarra Line6',
        ampBass: 'Amplificador de bajo Ampeg',
        speakers: 'Equipo de voz Berhinger'
      },
    }
  ]
  reservasFuturas = [
    {
      day: '10/02/2019',
      place: 'Ritmo & Compas',
      local: 'Local 10',
      hour: '18.00'
    },
  ];

  coordenadas = [
    {
      lat: 40.4268965528878,
      lng: -3.7015234947205045
    },
    {
      lat: 40.43094733953524,
      lng: -3.710449886322067
    },
    {
      lat: 40.43173133457571,
      lng: -3.695172023773239
    }

  ];


  bookin; // Para Breadcrumb

  //addUser(user) {
  //  return this.httpClient.post(`${environment.apiUrl}/user`, user).toPromise();
  //}


  editUser(id: number, body) {

    /*     this.users = this.users.map(user => {
          if (user.id === id) {
            body.id = id;
            // return body;
            this.userOnline = { ...user, ...body }
            return { ...user, ...body }; //
          }
          return user;
        }) */
  }


  deleteUser(id: number) {
    this.users = this.users.filter(user => user.id !== id)
  }


}


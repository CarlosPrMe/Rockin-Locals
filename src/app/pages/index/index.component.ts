import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private loginService: LoginService, ) {
    document.body.scrollTop = 0


  }

  ngOnInit() {
  }



}


/*
this.httpClient.get(`${environment.apiUrl}/auth/me`).toPromise().then((data:any) => {

          this.user.next(data)
          this.isLoged.next(true);
          console.log(this.user.value);

        })
*/

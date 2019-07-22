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
    window.scrollTo({
      top: 0,
      left: 0,
    });


  }

  ngOnInit() {
  }



}


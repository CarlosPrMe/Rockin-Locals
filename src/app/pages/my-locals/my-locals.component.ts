import { Component, OnInit } from '@angular/core';
import { LoggingService } from '../../services/logging.service';


@Component({
  selector: 'app-my-locals',
  templateUrl: './my-locals.component.html',
  styleUrls: ['./my-locals.component.scss']
})
export class MyLocalsComponent implements OnInit {

  user
  constructor(private loggingService: LoggingService) {

    this.loggingService.user.subscribe((res) => this.user = res)
    document.body.scrollTop = 0;
  }

  ngOnInit() {
  }

}

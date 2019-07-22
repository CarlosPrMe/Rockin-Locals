import { Component, OnInit, Input } from '@angular/core';
import { TestService } from '../../../services/test.service';
import { LocalsService } from '../../../services/locals.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private testService: TestService, private localsService : LocalsService) { }

  @Input()reservation;
  ngOnInit() {
  }



}

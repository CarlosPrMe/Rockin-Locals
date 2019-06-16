import { Component, OnInit, Input } from '@angular/core';
import { TestService } from '../../../services/test.service';
import { GetLocalsService } from '../../../services/getLocals.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private testService: TestService, private getLocalsService : GetLocalsService) { }

  ngOnInit() {
  }

  @Input() bookin =  this.testService.bookin;
  @Input() localSelected =  this.getLocalsService.localSelected;
}

import { Directive, Input, ElementRef, HostListener } from '@angular/core';
import { ScreenService } from '../../services/screen.service';

@Directive({
  selector: '[appParallax]'
})
export class ParallaxDirective {

  @Input('ratio') parallaxRatio : number = 1
  initialTop : number = 0

  constructor(private eleRef : ElementRef, private screen: ScreenService) {
    this.initialTop = this.eleRef.nativeElement.getBoundingClientRect().top
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll(event){

    if(this.screen.resolution.value > 1024){
      this.eleRef.nativeElement.style.top = (this.initialTop - (window.scrollY * this.parallaxRatio)) + 'px'

    }
  }

}

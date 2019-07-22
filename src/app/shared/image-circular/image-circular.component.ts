import { Component, ElementRef, AfterContentInit, ViewEncapsulation, Input, OnDestroy } from '@angular/core';
import { VrViewerModule } from 'angular-vrview'
import { ScreenService } from '../../services/screen.service';

declare let VRView;

@Component({
  selector: 'app-image-circular',
  templateUrl: './image-circular.component.html',
  styleUrls: ['./image-circular.component.scss']
})
export class ImageCircularComponent implements AfterContentInit, OnDestroy {

  elem: HTMLElement;
  private _v: any;
  image: string = 'hola';
  is_stereo: boolean;
  width: string;
  height: string;
  is_vr_off: boolean;
  is_autopan_off: boolean;
  is_yaw_only: boolean;
  VRView
  widthResponsive
  heightResponsive
  @Input() image360;

  constructor(ref: ElementRef, private screenService: ScreenService) {
    this.elem = ref.nativeElement;
    this.screenService.resolution.subscribe(res => {

      if (res > 1024) {
        this.widthResponsive = '400'
        this.heightResponsive = '250'
      } else if (res >= 768 && res < 1023){
        this.widthResponsive = '600'
        this.heightResponsive = '375'
      } else if (res < 767 ){
        this.widthResponsive = '300'
        this.heightResponsive = '188'
      }
    })

  }

  ngOnDestroy(){

  }

  ngAfterContentInit() {
    if (this.image != null) {
      this._v = new VRView.Player('.vrview' + this.elem.id, {
        image: `${this.image360}`,
        is_stereo: false,
        width: `${this.widthResponsive}`,
        height: `${this.heightResponsive}`,
        is_vr_off: true,
        is_autopan_off: false,
        is_yaw_only: false,
      });
    }
  }


}

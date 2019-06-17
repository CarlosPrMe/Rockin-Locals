import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-image-circular',
  templateUrl: './image-circular.component.html',
  styleUrls: ['./image-circular.component.scss']
})
export class ImageCircularComponent implements OnInit {

  constructor() { }

  onVrViewLoad() {

/*     let vrView = new VRView.Player('.vrview', {
      image: "../../../assets/img/Screen-Shot-2013-12-11-at-10.43.59-AM.png",
      is_stereo: false,
      width: '100%',
      height: '100%',
      is_vr_off: true,
      is_autopan_off: true,
      is_yaw_only: false,
    }); */
  }

  ngOnInit() {
    this.onVrViewLoad();

  }

}

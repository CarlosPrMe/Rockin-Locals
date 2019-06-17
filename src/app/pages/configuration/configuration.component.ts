import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { LoggingService } from '../../services/logging.service';
import { UserService } from '../../services/users.services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  user;

  constructor( private loggingService: LoggingService, private userService: UserService,
    private router: Router, private activatedRoute: ActivatedRoute) {

      document.body.scrollTop = 0;
     }


  ngOnInit() {

    this.loggingService.user.subscribe((res) => {
      //debugger
      this.user = res;
      //console.log(res)
    })
  }


  onEditUser($event,user){
    //console.log(user);
    this.userService.editUser(user).then((res:any)=> {

    })
    this.router.navigate(['/index']);
  }

  onDeleteUser(id){
    console.log(id);

    this.userService.deleteUser(id).then((res)=>{console.log(res);
    })
    this.router.navigate(['/index']);

  }
}

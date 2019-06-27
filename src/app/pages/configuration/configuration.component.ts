import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/users.services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  user;

  constructor( private loginService: LoginService, private userService: UserService,
    private router: Router, private activatedRoute: ActivatedRoute) {

      document.body.scrollTop = 0
     }


  ngOnInit() {

    this.loginService.user.subscribe((res) => {
      this.user = res;
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

import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import {User} from "../model/user";
import {UserService} from "../users/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  profile: any;
  user: User;

  constructor(public auth: AuthService, userService: UserService) { }

  ngOnInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }

    //this.user = this.userService.getUserByToken();
  }

}

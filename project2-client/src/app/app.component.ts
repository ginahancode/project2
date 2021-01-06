import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from "../app/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'project2-client';

  // currentUser: any;

  // constructor(
  //   private router: Router,
  //   private userService: UserService
  //   ) {
  //     this.userService.currentUser.subscribe(x => this.currentUser = x);
  //   }

  // logout() {
  //   this.userService.logout();
  //   this.router.navigate(['/']);
  // }

}

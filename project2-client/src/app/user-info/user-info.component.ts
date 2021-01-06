import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../user';
import { BannerComponent } from '../banner/banner.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  @Input() user: User;
  @Input() currentUser: User;

  isEditing: boolean;


  constructor(private userService: UserService, private router: Router) {
    //this.user = new User;

    this.userService.currentUser.subscribe(
      x => this.currentUser = x);
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.warn(this.currentUser);
  }

  ngOnInit(): void {
    this.isEditing = false;
    this.user = this.currentUser;
  }

  goToSocials() {
    this.router.navigate(['socials']);
  }

  goUserInfo() {
    this.router.navigate(['user-info']);
  }

  goHome() {
    this.router.navigate(['home']);
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }

  updateUserForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl('')
  });

  saveUser() {
    if (this.updateUserForm.get('firstName').value != '')
      this.user.firstName = this.updateUserForm.get('firstName').value;

    if (this.updateUserForm.get('lastName').value != '')
      this.user.lastName = this.updateUserForm.get('lastName').value;

    if (this.updateUserForm.get('username').value != '')
      this.user.username = this.updateUserForm.get('username').value;

    if (this.updateUserForm.get('email').value != '')
      this.user.email = this.updateUserForm.get('email').value;

    console.warn(this.currentUser);
  }

  updateUser(user: User) {
    this.saveUser();
    console.log(this.user);
    console.log("updating user");
    this.userService.updateUser(this.user).subscribe();
    this.isEditing = false;
    console.warn(this.currentUser)
    console.warn(this.user)
    this.currentUser = this.user;
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
  }

  editClicked() {
    this.isEditing = true;
  }


}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { User } from '../user';
import { ConfirmedValidator } from '../confirmed.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  user: User = new User();
  submitted = false;

  constructor(private userservice: UserService, private router: Router) {
  }

  ngOnInit() {
    this.submitted = false;
  }

  registeruserform = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(1)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(1)]),
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirm_password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  }, {
    validators: this.confirmPassword.bind(this)
  });

  confirmPassword(registeruserform: FormGroup) {
    const { value: password } = registeruserform.get('password');
    const { value: confirm_password } = registeruserform.get('confirm_password');

    return password === confirm_password ? null : {
      passwordNotMatch: true
    };
  }


  goToLogin(){
    this.router.navigate(['']);
  }

  saveUser(saveUser) {
    this.user = new User();
    this.user.firstName = this.FirstName.value;
    this.user.lastName = this.LastName.value;
    this.user.username = this.Username.value;
    this.user.password = this.Password.value;
    this.user.email = this.UserEmail.value;
    this.submitted = true;
    this.save();
  }

  save() {
    this.userservice.createUser(this.user)
      .subscribe(data => console.log(data), error => console.log(error));
    this.user = new User();
  }

  get FirstName() {
    return this.registeruserform.get('firstName');
  }

  get LastName() {
    return this.registeruserform.get('lastName');
  }

  get Username() {
    return this.registeruserform.get('username');
  }

  get Password() {
    return this.registeruserform.get('password');
  }

  get ConfirmPassword() {
    return this.registeruserform.get('confirm_password');
  }

  get UserEmail() {
    return this.registeruserform.get('email');
  }

  addUserForm() {
    this.submitted = false;
    this.registeruserform.reset();
  }

  btnLogin() {
    this.router.navigate(['/']);
  }

}

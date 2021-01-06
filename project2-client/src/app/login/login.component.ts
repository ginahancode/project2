import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
import { first } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  submitted = false;
  isLoggedIn = false;
  returnUrl: string;
  error: string;
  success = false;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
    ) { 
      if (this.userService.currentUserValue) {
        this.router.navigate(['/home']);
      }
    }

  ngOnInit() {
    this.isLoggedIn = false;

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  loginform = new FormGroup({
    username: new FormControl('', ),
    password: new FormControl('', )
  });

  goToSignup(){
    this.router.navigate(['signup']);
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginform.invalid) {
      return;
    }
    let user: User = new User();
    user.username = this.Username.value;
    user.password = this.Password.value;
    this.userService.loginUser(user)
    .subscribe(data => {
      console.log(data) 
      this.success = true;
      this.router.navigate([this.returnUrl]);
    }, 
      error => {
        this.error = error;
      });
    
  }



  get Username() {
    return this.loginform.get('username');
  }

  get Password() {
    return this.loginform.get('password');
  }

}

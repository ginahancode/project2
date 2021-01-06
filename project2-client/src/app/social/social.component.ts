import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../post';
import { RequestService } from '../request.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {

  users: any[];

  constructor(private req: RequestService, private router: Router, private userService: UserService) {
    this.getAllUsersAndPosts();
  }

  ngOnInit(): void {
  }

  social(id: string) {
    console.log(id)
    // this.userService.logout();
    this.router.navigate([`/socials/${id}`]);
  }

  getAllUsersAndPosts(){
    this.req.getAllUsersAndPosts().subscribe((res) => {

      let userIdCheck = res[0].user_id;
      let index = 0;

      let userMaster: any[] = [];

      // userMaster.push(new User);
      // userMaster[0].posts = new Array<Post>();
      // console.log(userMaster[0])
      // userMaster[0].posts.push(new Post);
      // console.log(userMaster[0])
      // userMaster[index].posts.push();

      
      res.forEach((item) => {
        if (userMaster[index] == undefined){
          userMaster.push(new User);
          //userMaster[index].firstName = item.first_name;
        }
          
        if (item.user_id == userIdCheck){
          userMaster[index].posts.push(item);
        } else {
          userMaster.push(new User);
          index++;
          //userMaster[index].firstName = item.first_name;
          userMaster[index].posts.push(item);
          userIdCheck = item.user_id;
        }
      })

      console.log(userMaster)
      this.users = userMaster;
      console.log(userMaster)

    });
  }

  goHome() {
    this.router.navigate(['/home'])
  }

  goToSocials() {
    this.router.navigate(['/socials'])
  }

  goUserInfo() {
    this.router.navigate(['/user-info'])
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}

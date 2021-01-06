import { Component, Input, OnInit, Output } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../user.service';
import { Post } from '../post';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-home-visit',
  templateUrl: './home-visit.component.html',
  styleUrls: ['./home-visit.component.css']
})
export class HomeVisitComponent implements OnInit {

  pathID: number; 

  currentUser: any;
  public clickedEvent: Post;
  statuses: string[] = ["All", "Currently Playing", "Completed", "On Hold", "Dropped", "Plan to Play"];
  masterPostList : Post[]

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private req: RequestService) {
    // this.userService.currentUser.subscribe(
    //   x => this.currentUser = x);
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // // console.log("ngOnInit of post-container " + this.currentUser.userID);
    this.route.params.subscribe((params) => {
            console.log(params);
            this.pathID = params.id;
            console.log(this.pathID)
          });

    this.getList(this.pathID);
  }

  ngOnInit(): void {}
  
  childEventClicked(event: Post) {
    this.clickedEvent = event;
    this.masterPostList.push(event);
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

  // selectStatus(event) {
  //   var target = event.target || event.srcElement;
  //   status = target.innerHTML;
  //   console.log("changing status to" + status)
  // }


  getList(userID: number) {
    this.req.getList(userID).subscribe(res => {
      console.log(res)
      this.masterPostList = res;
    })
  }
}





// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-home-visit',
//   templateUrl: './home-visit.component.html',
//   styleUrls: ['./home-visit.component.css']
// })
// export class HomeVisitComponent implements OnInit {

//   pathID: number; 

//   constructor(private route: ActivatedRoute) {
//     this.route.params.subscribe((params) => {
//       console.log(params);
//       this.pathID = params.id;
//       console.log(this.pathID)
//     });
//    }

//   ngOnInit(): void {
//   }

// }

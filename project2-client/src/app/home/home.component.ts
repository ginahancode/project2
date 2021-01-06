import { Component, Input, OnInit, Output } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { BannerComponent } from '../banner/banner.component';
import { UserService } from '../user.service';
import { Post } from '../post';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: any;
  public clickedEvent: Post;
  public clickedEvent2: Post;
  statuses: string[] = ["All", "Currently Playing", "Completed", "On Hold", "Dropped", "Plan to Play"];
  masterPostList : Post[]

  constructor(private router: Router, private userService: UserService, private req: RequestService) {
    this.userService.currentUser.subscribe(
      x => this.currentUser = x);
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // console.log("ngOnInit of post-container " + this.currentUser.userID);
    this.getList(this.currentUser.userID);

  }

  ngOnInit(): void {}

  goToSocials(){
    this.router.navigate(['socials']);
  }

  goUserInfo() {
    this.router.navigate(['user-info']);
  }

  goHome() {
    this.router.navigate(['home']);
  }

  childEventClicked(event: Post) {
    this.clickedEvent = event;
    this.masterPostList.push(event);
  }

  childEventClickedDelete(event: Post){
    console.log("in home event function with event= " + event)

    let filteredPostList = this.masterPostList.filter(function (post) {
      return post.postID != event.postID;
    });

    console.log(filteredPostList)
    this.masterPostList = filteredPostList;
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

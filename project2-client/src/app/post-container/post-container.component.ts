import { ChangeDetectorRef, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post';
import { PostDetailsComponent } from '../post-details/post-details.component';
import { RequestService } from '../request.service';
import { User } from '../user';

@Component({
  selector: 'app-post-container',
  templateUrl: './post-container.component.html',
  styleUrls: ['./post-container.component.css']
})
export class PostContainerComponent implements OnInit {

  @Input() postList: Post[];

  @Input() newGame: Post;

  @Input() currentUser: User;

  @Input() containerStatus: string;

  public clickedEvent: Post;

  scoreSort; userScoreSort; alphSort: boolean = true;

  @Output() eventClicked2 = new EventEmitter<Post>();

  ngOnChanges(changes: SimpleChanges) {
    console.log("changing values")
    console.log("status is " + this.containerStatus)
    console.log("postList is oninit " + this.postList)
    console.log("postList is oninit " + changes.newGame.currentValue)
    // this.filterList(this.containerStatus)
    // if (changes.newGame.currentValue){
    //   if (changes.newGame.currentValue != -1){
    //     console.log("IN ON CHANGES THING")
    //     this.postList.push(changes.newGame.currentValue);
    //     changes.newGame.currentValue = undefined;
    //   }
    //   changes.newGame.currentValue = -1;
    // }
    this.filterList(this.containerStatus)

  }

  sortList(item) {
    switch (item) {
      case 'score':
        this.scoreSort = !this.scoreSort;
        if (this.scoreSort)
          this.postList = this.postList.sort((a, b) => a.score - b.score);
        else
          this.postList = this.postList.sort((a, b) => b.score - a.score);
        break;
      case 'userScore':
        this.userScoreSort = !this.userScoreSort;
        if (this.userScoreSort)
          this.postList = this.postList.sort((a, b) => a.userScore - b.userScore);
        else
          this.postList = this.postList.sort((a, b) => b.userScore - a.userScore);
        break;
      case 'title':
        this.alphSort = !this.alphSort;
        if (this.alphSort) {
          this.postList = this.postList.sort(function (a, b) {
            if (a.title < b.title) { return -1; }
            if (a.title > b.title) { return 1; }
            return 0;
          })
        }
        else {
          this.postList = this.postList.sort(function (a, b) {
            if (a.title > b.title) { return -1; }
            if (a.title < b.title) { return 1; }
            return 0;
          })
        }

    }

    console.log((this.postList[0].title))
    console.log((this.postList[1].title))
    console.log(Number(this.postList[0].title))
    console.log(parseInt(this.postList[1].title))
  }

  // sortByScore(){
  //   this.sortAsc = !this.sortAsc;
  //   if (this.sortAsc)
  //     this.postList = this.postList.sort((a, b) => a.score - b.score);
  //   else
  //   this.postList = this.postList.sort((a, b) => b.score - a.score);
  // }

  childEventClicked(event: Post) {
    console.log("in event clicked container with " + event)
    let filteredPostList = this.postList.filter(function (post) {
      return post.postID != event.postID;
    });

    console.log(filteredPostList)
    this.postList = filteredPostList;
    this.eventClicked2.emit(event);
  }

  constructor() {
    console.log("constructor status is " + this.containerStatus)
    console.log("postList is " + this.postList)
  }

  ngOnInit(): void {
    console.log("status is " + this.containerStatus)
    console.log("postList is onngOninit " + this.postList)

    // this.getList(this.currentUser.userID);

    // console.log(status);
    // console.log(this.postList)
    // if (status == "")
    //   this.filterList("All");
    // else
    //   this.filterList(status);
  }

  // getList(userID: number){
  //   this.req.getList(userID).subscribe(res => {
  //     console.log(res)
  //     this.postList = res;
  //   })
  // }




  filterList(status: string) {
    console.log("in filter list w/ status: " + status)
    console.log("in filter list w/ list: " + this.postList)
    if (status !== "All") {
      let filteredPostList = this.postList.filter(function (post) {
        return post.status === status;
      });

      console.log("before filter:" + this.postList)
      this.postList = filteredPostList;
      console.log("after filer:" + this.postList)
    }
  }



}

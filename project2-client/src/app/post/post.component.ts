import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../user.service';
import { Post } from '../post';
import { RequestService } from '../request.service';


// import { POSTS } from '../mock-posts';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() game: Post;
  isDeleted: boolean;
  currentUser: any;

  @Output() eventClicked2 = new EventEmitter<Post>();

  constructor(private userService: UserService, private requestService: RequestService) { 
    this.game = new Post; //very important, without this line you get errors since it thinks game is undef.
    
  }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(
      x => this.currentUser = x);
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    console.log(this.game.userID)
    console.log(this.currentUser)


    this.isDeleted = false; 
    // if (this.currentUser.userID == this.game.userID){
    //   console.log("is true")
    //   this.check = true;
    // }
    // else{
    //   console.log("is false")
    //   this.check = false;
    // }

  // constructor(, private userService: UserService) { 
  //   this.game = new Post; //very important, without this line you get errors since it thinks game is undef.

  //   this.userService.currentUser.subscribe(
  //     x => this.currentUser = x );
  //   this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  // }
    }


  delete() {
    this.requestService.deletePost(this.game.postID)
    .subscribe(data => {
      console.warn("emitting post from post component " + this.game)
      this.eventClicked2.emit(this.game);

      //console.log(data), error => console.log(error)
      console.log("post deleted on back end")

      
    
    });
    
    // this.isDeleted = true;
    // this.requestService.getList(this.currentUser.userID);

    //emit event here
  }

}

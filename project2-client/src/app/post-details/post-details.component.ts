import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { SimpleChanges } from '@angular/core';
import { Post } from '../post';
import { RequestService } from '../request.service';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
// import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  closeResult = '';
  searchResultList;
  @Input() game: Post;

  gamePlatforms: any;
  gameGenres: any;
  gameScreenshots: any;
  images: any;

  currentUser: any;
  // reviewSubmitted = false;

  isPrefilled: boolean;
  showAddAlert: boolean = false;
  

  constructor(private modalService: NgbModal, private req: RequestService, private userService: UserService) {
    //this.game = new Post;

    this.userService.currentUser.subscribe(
      x => this.currentUser = x);
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit(): void {
    console.log(this.game)
    // this.reviewSubmitted=false;
  }

  // userReviewForm1 = new FormGroup({
  //   userScoreInput: new FormControl('', [Validators.max(99.99)])
  // });



  ngOnChanges(changes: SimpleChanges) {
    this.gamePlatforms = JSON.parse(this.game.platforms);
    this.gameGenres = JSON.parse(this.game.genres);
    this.gameScreenshots = JSON.parse(this.game.screenshots);


    this.images = this.gameScreenshots.map((n) => `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${n.image_id}.jpg`);

}

  openXl(content) {
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.searchResultList="";
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  userReviewForm = new FormGroup({
    userScore: new FormControl(''),
    status: new FormControl(''),
    review: new FormControl(''),
  }); 

  savePost() {
    if (this.userReviewForm.get('userScore').value != '' || 0)
      this.game.userScore = this.userReviewForm.get('userScore').value;

    if (this.userReviewForm.get('status').value != '')
      this.game.status = this.userReviewForm.get('status').value;
    
    if (this.userReviewForm.get('review').value != '')
      this.game.review = this.userReviewForm.get('review').value;
  }

  updatePost(game: Post) {
    this.savePost();
    this.req.updatePost(game).subscribe();
    this.isPrefilled = true;
    this.showAddAlert = true;
  }

  clickEdit() {
    console.log("edit button clicked");
    this.isPrefilled = false;
  }

}

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { RequestService } from '../request.service';
import { FormBuilder } from '@angular/forms';

import { Post } from '../post';
import { DatabaseLinkService } from '../database-link.service';
import { User } from '../user';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  closeResult = '';

  @Input() currentUser: User;
  searchResultList;
  userInput;
  checkoutForm;

  currOffset: number;
  inputData: string;

  receivedPost: Post;
  postList: Array<Post>;
  showAddAlert: boolean = false;

  @Output() eventClicked = new EventEmitter<Post>();

  constructor(private req: RequestService, private formBuilder: FormBuilder, private modalService: NgbModal, private heavyCall: DatabaseLinkService) {
    this.checkoutForm = this.formBuilder.group({
      userInput: ''
    });
  }

  ngOnInit(): void {
    //this.displaySearch();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);
  }

  open(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.searchResultList = "";
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  backButton() {
    if (this.currOffset != 0) {
      this.currOffset -= 5;
      this.displaySearchByName(this.inputData, this.currOffset)
    }
    console.log("offset " + this.currOffset)
    console.log("input data " + this.inputData)
  }

  forwardButton() {
    console.log("offset " + this.currOffset)
    console.log("input data " + this.inputData)

    if (this.searchResultList.length != 0) {
      this.currOffset += 5;
      this.displaySearchByName(this.inputData, this.currOffset)
    }
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

  displaySearchByName(name: string, offset: number) {
    this.req.searchDBByName(name, offset).subscribe((v) => {
      this.searchResultList = v;
      console.log(this.searchResultList)
    })
  }

  onSubmit(inputData) {
    this.currOffset = 0;
    this.inputData = inputData.userInput;

    console.log(inputData)
    this.displaySearchByName(inputData.userInput, 0)
    console.warn('Your order has been submitted', inputData);
  }

  buttonPost(gameId) {
    console.log(gameId)
    console.log(this.heavyCall)
    this.heavyCall.heavyCallById(gameId).subscribe((v) => {
      this.receivedPost = new Post;
      this.receivedPost.title = v[0].name || "N/A";
      this.receivedPost.score = v[0].aggregated_rating || -1;
      this.receivedPost.userScore = null;
      this.receivedPost.coverArt = v[0].cover?.image_id || "";
      if (v[0].release_dates)
        this.receivedPost.releaseDate = v[0].release_dates[0].human || "N/A";
      else
        this.receivedPost.releaseDate = "N/A";

      //release region serialization
      if (v[0].release_dates)
        this.receivedPost.releaseRegion = v[0].release_dates[0].region || "N/A";
      else
        this.receivedPost.releaseRegion = "N/A";
      console.warn(this.receivedPost.releaseRegion)
      this.receivedPost.releaseRegion = this.releaseRegionSerialize(this.receivedPost)
      console.warn(this.receivedPost.releaseRegion)

      //age rating serialization
      if (v[0].age_ratings)
        this.receivedPost.ageRating = v[0].age_ratings[0].rating || "N/A";
      else
        this.receivedPost.ageRating = "N/A";
      console.warn(this.receivedPost.ageRating)
      this.ageRatingSerialize(this.receivedPost);
      //TODO add method to serialize age ratings

      this.receivedPost.genres = JSON.stringify(v[0].genres);
      this.receivedPost.platforms = JSON.stringify(v[0].platforms);
      this.receivedPost.screenshots = JSON.stringify(v[0].screenshots);

      //setting userID
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      console.log(this.currentUser.userID)
      this.receivedPost.userID = this.currentUser.userID;
      console.log(this.receivedPost.userID)

      console.log(this.receivedPost);
      this.eventClicked.emit(this.receivedPost);
      //make call to database, with passed in data
      this.req.addPost(this.receivedPost).subscribe(req => {
        console.warn("response from database addition " + req.postID)
        this.receivedPost.postID = req.postID
      });

      this.showAddAlert = true;

      console.warn(this.receivedPost);
      // add in html
      // if (this.postList == undefined){
      //   console.log("in undef.")
      //   this.postList = new Array<Post>();
      //   this.postList.push(this.receivedPost);// call service to update "master" postList
      //   console.log("post list" + this.postList[0].title);
      // }
      // else{
      //   this.postList.push(this.receivedPost);
      //   console.log("post list" + this.postList[0])
      // }

      //add in database

    });
  }
  ageRatingSerialize(game: Post) {
    switch (game.ageRating.toString()) {
      case "1":
      case "7":
        game.ageRating = "EC"
        break;
      case "2":
      case "8":
        game.ageRating = "E"
        break;
      case "9":
        game.ageRating = "E10"
        break;
      case "3":
      case "4":
      case "10":
        game.ageRating = "T"
        break;
      case "5":
      case "11":
      case "12":
        game.ageRating = "M"
        break;
      default:
        game.ageRating = "RP"
    }
  }

  releaseRegionSerialize(game: Post) {
    console.warn("GOT " + game.releaseRegion)
    switch (game.releaseRegion.toString()) {
      case "1":
        game.releaseRegion = "Europe"
        return game.releaseRegion;
      case "2":
        console.warn("IN HERE")
        game.releaseRegion = "North America"
        return game.releaseRegion;
      case "3":
        game.releaseRegion = "Australia"
        return game.releaseRegion;
      case "4":
        game.releaseRegion = "New Zealand"
        return game.releaseRegion;
      case "5":
        game.releaseRegion = "Japan"
        return game.releaseRegion;
      case "6":
        game.releaseRegion = "China"
        return game.releaseRegion;
      case "7":
        game.releaseRegion = "Asia"
        return game.releaseRegion;
      case "8":
        game.releaseRegion = "Worldwide"
        return game.releaseRegion;
      default:
        game.releaseRegion = "N/A"
        return game.releaseRegion;
    }
  }
}

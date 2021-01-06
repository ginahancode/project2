import { Component, OnInit, Input, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';

import { RequestService } from '../request.service';

import { Post } from '../post';

import { FormBuilder, FormsModule } from '@angular/forms';
import { DatabaseLinkService } from '../database-link.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  pokeList;
  userInput;
  checkoutForm;
  receivedPost: Post;
  postList: Array<Post>;

  constructor(private req: RequestService, private formBuilder: FormBuilder, private heavyCall: DatabaseLinkService) {
    this.checkoutForm = this.formBuilder.group({
      userInput: ''
    });
   }

  ngOnInit(): void {
    //this.displaySearch();
  }

  displaySearch() {
    console.log("in search functino of display comp")
    this.req.searchDB().subscribe((v) => {
      console.log(v)})
  }

  displaySearchByName(name: string){
    this.req.searchDBByName(name, 0).subscribe((resp) => {
      
      this.pokeList = resp;
      console.log(this.pokeList)
    })
  }

  //onclick event to eecute displaysearchbyname
  onSubmit(inputData){
    //this.checkoutForm.reset(); //clears form data
    console.log(inputData)
    this.displaySearchByName(inputData.userInput)
    console.warn('Your order has been submitted', inputData);
  }

  buttonDo(gameId){
    console.log(gameId)
    this.heavyCall.heavyCallById(gameId).subscribe((v) => {
      this.receivedPost = new Post;
      this.receivedPost.title = v[0].name;
      this.receivedPost.score = v[0].aggregated_rating;
      this.receivedPost.coverArt = v[0].cover.image_id;
      this.receivedPost.releaseDate = v[0].release_dates[0].human;
      this.receivedPost.releaseRegion = v[0].release_dates[0].region;
      this.receivedPost.ageRating = v[0].age_ratings[0].rating;
      this.receivedPost.genres = v[0].genres;
      this.receivedPost.platforms = v[0].platforms;
      this.receivedPost.screenshots = v[0].screenshots;
      //this.receivedPost.artworks = v[0].artworks;
      console.log(this.receivedPost);
      //add in html
      if (this.postList == undefined){
        console.log("in undef.")
        this.postList = new Array<Post>();
        this.postList.push(this.receivedPost);
        console.log("post list" + this.postList[0].title);
      }
      else{
        this.postList.push(this.receivedPost);
        console.log("post list" + this.postList[0])
      }
      
      //add in database

    });
  }

}

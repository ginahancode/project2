import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Post } from './post';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  //private gameUrl = 'https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games';  // URL to web api
  private gameUrl = 'http://localhost:8081/https://api.igdb.com/v4/games';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 
 
  })
  };

  private body = 'fields name, id, aggregated_rating; search "pokemon";'
  // body = JSON.stringify({
  //   title: 'foo',
  //   body: 'bar',
  //   userId: 4,
  // })

  constructor(private http: HttpClient) { }

  searchDB() {
    //console.log(this.httpOptions.headers)
    console.log("in search functino of service")
    return this.http.post(this.gameUrl, this.body, this.httpOptions)
    .pipe(
      tap(_ => console.log('fetched games'))
    );
  }

  searchDBByName(name: string, offset: number){
    console.log("searching for:" + name)
    
    let temp_body = `fields name, cover.url, release_dates.human, release_dates.platform.name, release_dates.region, platforms.name; 
      search "${name}";
      limit 5; 
      offset ${offset};`

    return this.http.post(this.gameUrl, temp_body, this.httpOptions)
    .pipe(
      tap(_ => console.log('fetched heroes'))
    );
  }

  getList(userID: number) {
    return this.http.get<Post[]>(`http://localhost:8080/project2-server/api/posts/posts-by-status?userID=${userID}`)
  }

  addPost(post : Post){
    return this.http.post<Post>("http://localhost:8080/project2-server/api/posts/newpost", post)
    .pipe(
      tap(_ => console.log('add post'))
    );
  }

  updatePost(post : Post){
    return this.http.post("http://localhost:8080/project2-server/api/posts/updatepost", post)
    .pipe(
      tap(_ => console.log('update post'))
    );
  }

  deletePost(postID: number){
    return this.http.delete(`http://localhost:8080/project2-server/api/posts/deletepost?postID=${postID}`)
    .pipe(
      tap(_ => console.log('delete post'))
    );
  }


  //
  //social stuff
  //

  getAllUsersAndPosts() {
    return this.http.get<any[]>(`http://localhost:8080/project2-server/api/users/usersandposts`)
  }
}

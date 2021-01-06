import { Injectable } from '@angular/core';
 
import { Post } from './post';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseLinkService {

  constructor(private http: HttpClient) { }

  //private gameUrl = 'https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games';  // URL to web api
  private gameUrl = 'http://localhost:8081/https://api.igdb.com/v4/games';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 

  })
  };

  heavyCallById(id: number): Observable<Post>{
    console.log("searching for:" + name)
    let body = 
    `fields name, aggregated_rating, cover.image_id, 
    release_dates.human, release_dates.region, age_ratings.rating, 
    genres.name, platforms.name, screenshots.image_id, artworks.image_id;
    where id=${id};`
    console.log(body)
    return this.http.post<Post>(this.gameUrl, body, this.httpOptions)
    .pipe(
      tap(_ => console.log('in heavy API call'))
    );
  }

}

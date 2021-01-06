import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  private baseUrl = 'http://localhost:8080/project2-server/api/users/';

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  //register user, inserts into db
  createUser(user: object): Observable<object> {
    return this.http.post(`${this.baseUrl}` + 'save-user', user);
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  loginUser(user: User) {
    return this.http.post(`${this.baseUrl}` + 'login', user)
    .pipe(map(u => {
      localStorage.setItem('currentUser', JSON.stringify(u));
      this.currentUserSubject.next(u);
      console.log(u);
      return u;
    }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  updateUser(user: User) {
    console.log(user);
    return this.http.post(`${this.baseUrl}update-user`, user)
    .pipe(
      tap(_ => console.log('update user'))
    );
  }

}

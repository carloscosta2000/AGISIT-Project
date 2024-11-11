import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from 'src/models/user';
import Config from "../../config.json";

@Injectable({ providedIn: 'root' })
export class UserService {

  //private usersUrl = Config.BASE_URL + '/users';  // URL to web api
  //private userUrl = Config.BASE_URL + '/user';  // URL to web api
  private usersUrl = '/users';  // URL to web api
  private userUrl = '/user';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  checkLogin(username: string, password: string): Observable<User> {
    const url = `${this.usersUrl}/${username}`;
    var userDetails = {username: username, password: password}
    return this.http.post<User>(url, userDetails, this.httpOptions);
  }


  getUser(username: string): Observable<User> {
    const url = `${this.userUrl}/${username}`;
    return this.http.get<User>(url).pipe(
      catchError(this.handleError<User>(`getUser username=${username}`))
    );
  }

  /** POST: add a new user to the server */
  addUser(user: User): Observable<User> {
    console.log(this.usersUrl)
    return this.http.post<User>(this.usersUrl + "/", user, this.httpOptions);
  }


  getUsers() :Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl + "/", this.httpOptions);
  }
  

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
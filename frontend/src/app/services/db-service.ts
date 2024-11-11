import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from 'src/models/task';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Project } from 'src/models/project';
import Config from "../../config.json";

@Injectable({ providedIn: 'root' })
export class DBService {

  //private initUrl = Config.BASE_URL + '/init';
  private initUrl = 'http://localhost:3019/init';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  resetDB(): Observable<string> {
      console.log(this.initUrl)
    return this.http.get<string>(this.initUrl);
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
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Task } from 'src/models/task';
import { Project } from 'src/models/project';
import Config from "../../config.json";

@Injectable({ providedIn: 'root' })
export class TaskService {

  //private tasksUrl = Config.BASE_URL + '/tasks';  // URL to web api
  //private taskUrl = Config.BASE_URL + '/task';  // URL to web api
  private tasksUrl = '/tasks';  // URL to web api
  private taskUrl = '/task';  // URL to web api


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  updateProgress(task: Task, perc: number): Observable<Task>{
    const url = `${this.taskUrl}/perc/${task._id}`;
    console.log(url);
    console.log("Service " + perc);
    let body = {
      perc: perc
    }
    return this.http.put<Task>(url, body, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<Task>(`updateProgress username=${task.taskName} progress=${perc}`)));
  }

  updateDates(task:Task, startDate: Date, endDate: Date,) {
    const url = `${this.taskUrl}/dates/${task._id}`;
    console.log(task.user)
    let body = {
      startDate:startDate,
      endDate: endDate,
      user: task.user
    }
    return this.http.put<Task>(url, body, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<Task>(`updateProgress username=${task.taskName} dates=${task.startDate}`)));
  }

  updateStartDate(task:Task, startDate: Date) {
    const url = `${this.taskUrl}/dates/${task._id}`;
    console.log(task.user)
    let body = {
      startDate:startDate,
      user: task.user
    }
    return this.http.put<Task>(url, body, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<Task>(`updateProgress username=${task.taskName} dates=${task.startDate}`)));
  }

  updateEndDate(task:Task, endDate: Date) {
    const url = `${this.taskUrl}/dates/${task._id}`;
    console.log(task.user)
    let body = {
      endDate: endDate,
      user: task.user
    }
    return this.http.put<Task>(url, body, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<Task>(`updateProgress username=${task.taskName} dates=${task.startDate}`)));
  }
  

  getTasksByUser(username: String): Observable<Task[]>{
    const url = `${this.tasksUrl}/${username}`;
    return this.http.get<Task[]>(url, this.httpOptions).pipe(catchError(this.handleError<Task[]>(`getTasks username=${username}`)));
  }


  addTask(task: any): Observable<any> {
    console.log("No service:" + task)
    var users = []
    users.push(task.user[0])
    task.user = users
    console.log(users)
    return this.http.post<any>(this.tasksUrl + "/", task, this.httpOptions).pipe(catchError(this.handleError<any>(`addTask taskName=${task.taskName}`)));
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl + "/")
      .pipe(
        tap(),
        catchError(this.handleError<Task[]>('getTasks', []))
      );
  }

  getTaskById(_id: string): Observable<Task[]> {
    const url = `${this.taskUrl}/${_id}`;
    return this.http.get<Task[]>(url)
      .pipe(
        tap(_ => console.log()),
        catchError(this.handleError<Task[]>('getTaskById', []))
      );
  }



  updateProjectTask(task : string, project: string): Observable<any> {
    const url = `${this.taskUrl}/`+task;
    let body = {
      taskId: task,
      project: project
    }
    return this.http.put(url, body, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<any>('updateTask')))
  }

  updateUserTask(username :string, taskId: string): Observable<any> {
    const url = `${this.taskUrl}/association/`+ taskId;
    let body = {
      taskId: taskId,
      username: username
    }
    return this.http.put(url, body, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<any>('updateUserTask')))
  }

  deleteUserTask(username: string, taskId: string): Observable<any> {
    const url = `${this.taskUrl}/disassociation/`+ taskId;
    let body = {
      taskId: taskId,
      username: username
    }
    return this.http.put(url, body, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<any>('updateUserTask')))
  }


  /** DELETE: delete the hero from the server */
  deleteTask(id: String): Observable<Task> {
    console.log("Delete")
    const url = `${this.tasksUrl}/${id}`;
    return this.http.delete<Task>(url, this.httpOptions).pipe(
      tap()
    );
  }

  deleteAssociation(projectAcronym: string, taskId:string): Observable<any> {
    const url = `${this.taskUrl}/disassociationProject/`+taskId;
    let body = {
      projectAcronym: projectAcronym,
      taskId: taskId
    }
    return this.http.put(url, body, this.httpOptions).pipe(
      tap(),
      catchError(this.handleError<any>('associateTeamToProject')))
  }
}
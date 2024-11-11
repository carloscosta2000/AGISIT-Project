import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from 'src/models/task';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Project } from 'src/models/project';
import Config from "../../config.json";


@Injectable({ providedIn: 'root' })
export class ProjectService {

  //private projectsUrl = Config.BASE_URL + '/projects';  // URL to web api
  //private projectUrl = Config.BASE_URL + '/project';  // URL to web api
  private projectsUrl = '/projects';  // URL to web api
  private projectUrl = '/project';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}



  getProject(projectName: string): Observable<Project> {
    const url = `${this.projectsUrl}`;
    return this.http.get<Project>(url).pipe(
      catchError(this.handleError<Project>(`getProject projectName=${projectName}`))
    );
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl)
  }

  getProjectByAcronym(acronym: string): Observable<Project> {
    const url = `${this.projectUrl}/${acronym}`;
    return this.http.get<Project>(url).pipe(
      catchError(this.handleError<Project>(`getProject acronym=${acronym}`))
    );
  }

  /** POST: add a new project to the server */
  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.projectsUrl, project, this.httpOptions).pipe(catchError(this.handleError<Project>(`addProject projectName=${project.projectName}`)));
  }
  
  addTaskProject(task: Task, project: string): Observable<Project>{
    const url = `${this.projectUrl}/${project}`;
    return this.http.post<Project>(url, task, this.httpOptions).pipe(catchError(this.handleError<Project>(`addTaskProject projectName=${project}`)));
  }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl)
      .pipe(
        tap(),
        catchError(this.handleError<Project[]>('getProjects', []))
      );
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
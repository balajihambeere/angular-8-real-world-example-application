import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Project } from './project.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../shared';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProjectService {

    constructor(private http: HttpClient, private router: Router) {
    }

    getProjects(): Observable<ResponseModel> {

        const route = `${environment.api_url}projects`;

        return this.http.get<ResponseModel>(route)
            .pipe(
                catchError(this.handleError)
            );
    }

    getProjectById(projectId: string): Observable<Project> {

        const route = `${environment.api_url}projects/${projectId}`;

        return this.http.get<Project>(route)
            .pipe(
                catchError(this.handleError)
            );
    }

    addProject(project: Project): Observable<Project> {

        const route = `${environment.api_url}projects`;

        return this.http.post<Project>(route, project, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    updateProject(projectId: string, project: Project): Observable<Project> {

        const route = `${environment.api_url}projects/${projectId}`;

        return this.http.put<Project>(route, project, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteProject(projectId: string): Observable<Project> {

        const route = `${environment.api_url}projects/${projectId}`;

        return this.http.delete<Project>(route, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            const result = `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`;
            console.error(result);
        }
        return throwError(
            'Something bad happened; please try again later.');
    }
}

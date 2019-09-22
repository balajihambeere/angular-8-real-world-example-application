import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Task } from './task.model';

import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

import { ResponseModel } from '../shared';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TaskService {

    constructor(private http: HttpClient, private router: Router) {
    }

    getTasksByProjectId(projectId: string): Observable<ResponseModel> {

        const route = `${environment.api_url}project/${projectId}/tasks`;

        return this.http.get<ResponseModel>(route)
            .pipe(
                catchError(this.handleError)
            );
    }

    getTaskById(id: string): Observable<Task> {

        const route = `${environment.api_url}tasks/${id}`;

        return this.http.get<Task>(route)
            .pipe(
                catchError(this.handleError)
            );
    }

    addTask(task: Task): Observable<Task> {

        const route = `${environment.api_url}tasks`;

        return this.http.post<Task>(route, task, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    updateTask(id: string, task: Task): Observable<Task> {

        const route = `${environment.api_url}tasks/${id}`;

        return this.http.put<Task>(route, task, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteTask(id: string): Observable<Task> {

        const route = `${environment.api_url}tasks/${id}`;

        return this.http.delete<Task>(route, httpOptions)
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

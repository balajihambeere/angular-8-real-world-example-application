import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../shared';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class StatsService {

    constructor(private http: HttpClient) {
    }

    getStats(): Observable<ResponseModel> {
        return this.http.get<ResponseModel>(environment.api_url + 'stats/')
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

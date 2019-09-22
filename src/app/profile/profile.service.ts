import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Profile } from './profile.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../shared';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class ProfileService {

    constructor(private http: HttpClient) {
    }

    getProfileById(id: string): Observable<ResponseModel> {
        const route = `${environment.api_url}profile/${id}`;
        return this.http.get<ResponseModel>(route)
            .pipe(
                catchError(this.handleError)
            );
    }

    updateProfile(id: string, profile: Profile): Observable<Profile> {
        const route = `${environment.api_url}profile/${id}`;
        console.log(route, profile);
        return this.http.put<Profile>(route, profile, httpOptions)
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

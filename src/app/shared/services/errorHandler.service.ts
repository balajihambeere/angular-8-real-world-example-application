import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { Router } from '@angular/router';

/** Type of the handleError function returned by HttpErrorHandler.createHandleError */
export type HandleError = <T> (operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;

/** Handles HttpClient errors */
@Injectable()
export class ErrorHandlerService {
    constructor(private messageService: MessageService,
                private router: Router) { }

    /** Create curried handleError function that already knows the service name */
    createHandleError = (serviceName = '') => <T>
        (operation = 'operation', result = {} as T) => this.handleError(serviceName, operation, result)

    handleError<T>(serviceName = '', operation = 'operation', result = {} as T) {
        this.messageService.clear();
        return (error: HttpErrorResponse): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            // if (error.error.errors instanceof Array === false) {
            //     if (error.status === 401) {
            //         this.authService.purgeAuth();
            //         //this.router.navigate(['']);
            //         this.router.navigate(['**']);
            //     }
            // }

            // console.error(error.error); // log to console instead
            // const message = (error.error instanceof ErrorEvent) ?
            //     error.error.message : error.error.errors;
            // // TODO: better job of transforming error for user consumption
            // if (error.error.errors instanceof Array) {
            //     error.error.errors.forEach(element => {
            //         this.messageService.add(element);
            //     });
            // } else {
            //     this.messageService.add(message);
            // }

            // this.messageService.add(`${serviceName}: ${operation} failed: ${message}`);
            // Let the app keep running by returning a safe result.
            return of(result);
        };
    }
}

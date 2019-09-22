import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from './auth.model';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JwtService } from '../shared';


@Injectable()
export class AuthService {

    private currentUserSubject = new BehaviorSubject<Auth>(new Auth());
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor(private http: HttpClient, private jwtService: JwtService, private router: Router) {
    }

    clearAuth(): any {
        this.jwtService.destroyToken();
        this.currentUserSubject.next(new Auth());
        this.isAuthenticatedSubject.next(false);
        this.router.navigate(['']);
    }

    setAuth(token) {
        if (token == null) {
            this.clearAuth();
        } else {
            const user = new Auth();
            user.token = token;
            this.jwtService.saveToken(token);
            this.currentUserSubject.next(user);
            this.isAuthenticatedSubject.next(true);
        }
    }

    auth(type: string, user: Auth): Observable<Auth> {
        const route = (type === 'login') ? environment.api_url + 'signin' : environment.api_url + 'signup';
        return this.http.post<Auth>(route, user)
            .pipe(map(result => {
                if (type === 'login') {
                    this.setAuth(result.data.token);
                    return result;
                } else {
                    return result;
                }
            }));
    }
}

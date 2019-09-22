import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { JwtService } from './services/jwt.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private jwtService: JwtService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.jwtService.getToken();
        const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${authToken}` } });
        return next.handle(authReq);
    }
}

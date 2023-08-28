import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthenticationService } from "../services/service-authentication/authentication.service";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    
    constructor(private authentiationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                this.authentiationService.logout();
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}
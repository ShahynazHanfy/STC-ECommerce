import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { User } from "../models/model-user";

const users: User[] =
    [
        { id: 1, username: 'admin', password: 'admin' },
        { id: 2, username: 'user', password: 'user' }];

@Injectable()
export class AuthEndPointInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<User>> {
        const { url, method, body } = request;
        if (url.endsWith('/users/authenticate') && method === 'POST') {
            return this.authenticate(body);
        }
        return next.handle(request);
    }

    private authenticate = (body: User) => {
        const { username, password } = body;
        const user = users.find(x => x.username === username && x.password === password);
        if (!user) {
            return this.error('Username or password is incorrect');
        }
        return this.ok({
            id: user.id,
            username: user.username,
            // we suppose that the token is the username 'user for any user', 'admin for admin'
            token: user.username
        })
    }

    private ok = (body?: {
        id: number; username: string;
        // we suppose that the token is the username
        token: string;
    }) => {
        return of(new HttpResponse({ status: 200, body }))
    }

    private error = (message: string) => {
        return throwError({ error: { message } });
    }
}
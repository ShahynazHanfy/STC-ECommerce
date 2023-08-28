import { Inject, Injectable } from '@angular/core';
import { User } from '../../models/model-user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LibraryConfig } from '../../models/model.config';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject('config') private config: LibraryConfig
  ) { }

  login(user: User): Observable<User> {
    return this.http
      .post<User>(this.config.authEndpoint, {
        username: user.username,
        password: user.password,
        token:user.username
      })
      .pipe(
        map((user) => {
          localStorage.setItem('musicUser', JSON.stringify(user));
          return user;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('musicUser');
    this.router.navigate(['/']);
    
  }

  getLoggedUser(): User {
    return JSON.parse(localStorage.getItem('musicUser') || '{}');
  }

  isUserAuthenticated(): boolean {
    return !!localStorage.getItem('musicUser');
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogInService {
  constructor(private http: HttpClient) {}

  isLoggedIn: boolean = false;

  getAllAccs() {
    return this.http.get<User[]>('http://localhost:3000/login-page/all');
  }

  logInUser(user: User) {
    return this.http
      .post<User>('http://localhost:3000/login-page/users/login', user)
      .pipe(
        map((response) => {
          localStorage.setItem('JWT_TOKEN', response.token);
          this.isLoggedIn = true;
          return response;
        }),
        catchError((err) => {
          this.isLoggedIn = false;
          return err;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('JWT_TOKEN');
    this.isLoggedIn = false;
  }

  registerNewUser(newUser: User) {
    return this.http.post<User>(
      'http://localhost:3000/login-page/register',
      newUser
    );
  }
}

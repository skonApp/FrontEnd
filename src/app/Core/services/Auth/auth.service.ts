import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:9090/user';

  // Registre method (post)
  signup(user: any): Observable<any> {
    return this.http.post(`${this.url}/signup`, user).pipe(
      catchError((error) => {
        console.error('An error occurred', error);
        return throwError('An error occurred; please try again later.');
      })
    );
  }
  // login
  signin(user: any): Observable<any> {
    return this.http.post(`${this.url}/signin`, user).pipe(
      catchError((error) => {
        console.error('An error occurred', error);
        return throwError('An error occurred; please try again later.');
      })
    );
  }
  //Retrive user data from localStorage
  getUserData() {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  }
  // update the local storage
  setUserData(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  //update user
  updatePassword(
    userId: string,
    password: { currentPassword: string; newPassword: string }
  ): Observable<any> {
    return this.http.put(`${this.url}/updatePassword/${userId}`, password).pipe(
      catchError((error) => {
        console.error('An error occurred', error);
        return throwError('An error occurred; please try again later.');
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    const currentUser = localStorage.getItem('currentUser');
    return !!token && !!currentUser; // Double negation to convert to boolean
  }

  // get Referer users
  getRefererUsers(userId: number): Observable<any> {
    return this.http.get(`${this.url}/referred-users/${userId}`).pipe(
      catchError((error) => {
        console.error('An error occurred', error);
        return throwError('An error occurred; please try again later.');
      })
    );
  }
  // get user by Id
  getUser(userId: string): Observable<any> {
    return this.http.get(`${this.url}/${userId}`).pipe(
      catchError((error) => {
        console.error('An error occurred', error);
        return throwError('An error occurred; please try again later.');
      })
    );
  }
}

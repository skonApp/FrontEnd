import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:9090/sub/';

  // Retrieve Plan
  getPlan(): Observable<any> {
    return this.http.get(`${this.url}`).pipe(
      catchError((error) => {
        console.error('An error occurred', error);
        return throwError('An error occurred; please try again later.');
      })
    );
  }
  //active Subscription
  activateSubscription(userId: string, planId: string): Observable<any> {
    return this.http
      .post<any>(`${this.url}activateSub`, { userId, planId })
      .pipe(
        catchError((error) => {
          console.error('Activation error', error);
          return throwError('Activation error; please try again later.');
        })
      );
  }
}

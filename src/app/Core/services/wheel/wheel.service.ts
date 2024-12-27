import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WheelService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:9090/wheel/';

  // Retrieve Plan
  getSpinHistory(userId: string): Observable<any> {
    return this.http.get<any[]>(`${this.url}spinHistory/${userId}`).pipe(
      catchError((error) => {
        console.error('An error occurred', error);
        return throwError('An error occurred; please try again later.');
      })
    );
  }

  spinWheel(userId: string): Observable<any> {
    const payload = { userId };
    return this.http.post(`${this.url}spin`, payload).pipe(
      catchError((error) => {
        console.error('Spin error', error);
        return throwError('An error occurred while spinning the wheel; please try again later.');
      })
    );
  }
  

  getWheelItems(): Observable<any> {
    return this.http.get<any[]>(`${this.url}wheelItems`).pipe(
      catchError((error) => {
        console.error('An error occurred', error);
        return throwError('An error occurred; please try again later.');
      })
    );
  }
}

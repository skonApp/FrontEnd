import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepositService {

  constructor(private http: HttpClient) {}

  private url = 'http://localhost:9090/deposit';

  generatePayment(amount: number): Observable<any> {
    return this.http.post(`${this.url}/generate-payment`, { amount }).pipe(
      catchError((error) => {
        console.error('An error occurred', error);
        return throwError('An error occurred; please try again later.');
      })
    );
  }
}

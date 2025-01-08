import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Withdraw } from '../../models/Withdraw';
@Injectable({
  providedIn: 'root'
})
export class WithdrawService {

  constructor(private http: HttpClient) {}

  private url = 'http://localhost:9090/user';


    withdrawRequest(withdrawData: Withdraw,userId:string): Observable<any> {
      return this.http.post(`${this.url}/cwr/${userId}`, withdrawData).pipe(
        catchError((error) => {
          console.error('An error occurred', error);
          return throwError('An error occurred; please try again later.');
        })
      );
    }
}

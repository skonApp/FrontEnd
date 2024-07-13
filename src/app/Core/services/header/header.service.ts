import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private showHeaderSubject = new BehaviorSubject<boolean>(true);
  private showHeaderLoginSubject = new BehaviorSubject<boolean>(false);

  showHeader$ = this.showHeaderSubject.asObservable();
  showHeaderLogin$ = this.showHeaderLoginSubject.asObservable();

  disableHeader() {
    this.showHeaderSubject.next(false);
    this.showHeaderLoginSubject.next(false);
  }

  enableHeader() {
    this.showHeaderSubject.next(true);
    this.showHeaderLoginSubject.next(false);
  }
  enableHeaderLogin() {
    this.showHeaderSubject.next(false);
    this.showHeaderLoginSubject.next(true);
  }
}

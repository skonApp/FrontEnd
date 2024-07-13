import { AuthService } from './../../../Core/services/Auth/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-login',
  templateUrl: './header-login.component.html',
  styleUrl: './header-login.component.css',
})
export class HeaderLoginComponent {
  constructor(private router: Router, private authService: AuthService) {}
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}

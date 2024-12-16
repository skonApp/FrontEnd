import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Core/services/auth/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '../../Core/services/header/header.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService],
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private headerService: HeaderService,
    private messageService: MessageService
  ) {
    this.form = this.formBuilder.group({
      phoneNumber: ['', [Validators.required, Validators.maxLength(8),Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  ngOnInit() {
    this.headerService.enableHeader();
  }
  login() {
    if (this.form.invalid) {
      return;
    }

    const { phoneNumber, password } = this.form.value;
    this.authService.signin({ phoneNumber, password }).subscribe(
      (response) => {
        console.log('Sign In Successful', response);
        localStorage.setItem('token', response.MyToken);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Logged in successfully',

        });
        setTimeout(() => {
          this.router.navigate(['']);
        }, 1000);
      },
      (error) => {
        console.error('Sign In Error', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Invalid phoneNumber or password',
        });
      }
    );
  }
}

import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../Core/services/auth/auth.service';
import { Component, Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { HeaderService } from '../../Core/services/header/header.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.css'],
  providers: [MessageService],
})
export class RegistreComponent {
  form: FormGroup;
  invitationCode: string = '';

  user = {
    name: '',
    lastname: '',
    phoneNumber: '',
    password: '',
    invitationCode: '',
  };

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private headerService: HeaderService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
  ) {
    this.form = this.formBuilder.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(12),
          ],
        ],
        lastname: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(12),
          ],
        ],
        phoneNumber: [
          '',
          [
            Validators.required,
            Validators.maxLength(8),
            Validators.minLength(8),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  ngOnInit() {
    this.headerService.enableHeader();
    this.invitationCode =
      this.route.snapshot.paramMap.get('invitationCode') || '';
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { mismatch: true };
    } else {
      return null;
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const { name, lastname, phoneNumber, password } = this.form.value;
    const user = {
      name,
      lastname,
      phoneNumber,
      password,
      invitationCode: this.invitationCode,
    };

    this.authService.signup(user).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Sign Up Successful',
        });
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 1000);
      },
      (error) => {
        console.error('Full Error Object:', error); // Ensure this logs the error object
      
        if (error.status === 409) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Warning',
            detail: error.error.message || 'Account already exists!',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred during sign up. Please try again.',
          });
        }
      }
      
    );
  }
}

import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../Core/services/Auth/auth.service';
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
    email: '',
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
        email: ['', [Validators.required, Validators.email]],
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

    const { name, lastname, email, password } = this.form.value;
    const user = {
      name,
      lastname,
      email,
      password,
      invitationCode: this.invitationCode,
    };

    this.authService.signup(user).subscribe(
      (response) => {
        console.log('Sign Up Successful', response);
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
        console.error('Sign Up Error', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Sign Up Error',
        });
      }
    );
  }
}

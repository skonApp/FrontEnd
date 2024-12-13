import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../Core/services/auth/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent {
  form: FormGroup;

  //password toggle :
  showOldPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  currentPassword: any;
  newPassword: any;
  userId: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group(
      {
        oldPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(12),
          ],
        ],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(12),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }
  ngOnInit() {
    this.userId = this.authService.getUserData()._id;
  }

  // check if the password and confirm password are the same
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');
    if (
      newPassword &&
      confirmPassword &&
      newPassword.value !== confirmPassword.value
    ) {
      return { mismatch: true };
    } else {
      return null;
    }
  }

  onSubmit() {
    const { oldPassword, newPassword } = this.form.value;
    this.authService
      .updatePassword(this.userId, {
        currentPassword: oldPassword,
        newPassword,
      })
      .subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Password Updated',
            detail: 'Your password has been updated successfully',
          });
        },
        (error) => {
          console.log('error :', error);
          const errorMsg =
            error.error.message ||
            'An error occurred while updating your password';
          this.messageService.add({
            severity: 'error',
            summary: 'Update Failed',
            detail: errorMsg,
          });
        }
      );
  }
  toggleShowPassword(field: string) {
    if (field === 'oldPassword') {
      this.showOldPassword = !this.showOldPassword;
    } else if (field === 'newPassword') {
      this.showNewPassword = !this.showNewPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
}

import { AuthService } from './../../../Core/services/auth/auth.service';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DepositService } from '../../../Core/services/deposit/deposit.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.css',
  providers: [MessageService],
})
export class DepositComponent {
  form: FormGroup;
  enteredAmount: number = 1;
  depositAmount: number = 1;
  paymentLink: string | null = null;

  // Define the selected payment method
  selectedPaymentMethod: string = '';

  // Function to handle selecting a payment method
  selectPaymentMethod(method: string) {
    this.selectedPaymentMethod = method;
    this.form.controls['paymentType'].setValue(method); // Update the form control
  }

  constructor(
    private fb: FormBuilder,
    private depositService: DepositService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      enteredAmount: ['', [Validators.required, Validators.min(1)]],
    });
  }
  submitDeposit() {
    const userId = this.authService.getUserData()._id;
    this.depositAmount = this.enteredAmount * 1000;
    this.depositService.generatePayment(this.depositAmount, userId).subscribe(
      (response) => {
        this.paymentLink = response.result?.link;
        console.log('opened in externel window', this.paymentLink);
        if (this.paymentLink) {
          window.open(this.paymentLink, '_blank');
        }
      },
      (error) => {
        console.error('Error during payment generation:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Payment Error',
          detail: 'Failed to generate payment. Please try again later.',
        });
      }
    );
  }
}

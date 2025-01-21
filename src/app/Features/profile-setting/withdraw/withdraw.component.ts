import { AuthService } from './../../../Core/services/auth/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WithdrawService } from '../../../Core/services/withdraw/withdraw.service';
import { Withdraw } from '../../../Core/models/Withdraw';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css'],
  providers: [MessageService],
})
export class WithdrawComponent {
  selectedPaymentType: string = '';
  amount: number | null = null;
  note: string = '';
  userId: string = '';
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private withdrawService: WithdrawService,
    private messageService: MessageService,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      method: ['', Validators.required],
      amount: [
        null,
        [Validators.required, Validators.min(1), Validators.max(10000)],
      ],
      note: ['', Validators.maxLength(200)],
    });
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserData()._id;
  }

  submitWithdraw() {
    const formData: Withdraw = this.form.value;
    this.withdrawService.withdrawRequest(formData,this.userId).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Withdraw request sent',
          detail: 'Your withdraw request has been sent successfully',
        });
      },
      (error) => {
        console.error('Error during withdraw request:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Payment Error',
          detail: 'Failed to generate payment. Please try again later.',
        });
      }
    );
  }
}

import { AuthService } from './../../Core/services/Auth/auth.service';
import { HeaderService } from '../../Core/services/header/header.service';
import { SubscriptionService } from './../../Core/services/subscription/subscription.service';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.css',
  providers: [MessageService],
})
export class PlanComponent {
  subscriptions: any;
  userId: any;
  constructor(
    private subscriptionService: SubscriptionService,
    private headerService: HeaderService,
    private authService: AuthService,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.headerService.enableHeaderLogin();
    this.fetchUserData();
    this.fetchSub();
  }

  fetchUserData(): void {
    const userData = this.authService.getUserData();
    if (userData) {
      this.userId = userData._id; // Assuming the user data has an `id` property
    }
  }

  fetchSub() {
    this.subscriptionService.getPlan().subscribe(
      (response) => {
        // Expecting an object with a 'data' property containing an array of SubscriptionPlan
        console.log('subscription', response.data);
        this.subscriptions = response.data;
      },
      (error) => {
        console.error('error', error);
      }
    );
  }

  // Activate subscription
  activatePlan(planId: string): void {
    if (!this.userId) {
      console.error('User ID not available');
      return;
    }
    this.subscriptionService
      .activateSubscription(this.userId, planId)
      .subscribe(
        (response) => {
          console.log('Activation successful', response);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Subscription activated successfully',
          });
        },
        (error) => {
          console.error("errorrrrrr :", error.error.status);
          // console.error('Activation failed', error);
          if (
            error.error &&
            error.error.message === 'User already has an active subscription'
          ) {
            this.messageService.add({
              severity: 'warn',
              summary: 'Warning',
              detail: 'User already has an active subscription',
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Subscription activation failed',
            });
          }
        }
      );
  }
}

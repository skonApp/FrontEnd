import { MessageService } from 'primeng/api';
import { AuthService } from '../../Core/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../Core/services/header/header.service';
import { SubscriptionPlan } from '../../Core/models/SubscriptionPlan';
import { User } from '../../Core/models/User';
import { UserSubscription } from '../../Core/models/UserSubscription';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.css'],
  providers: [MessageService],
})
export class ProfileSettingComponent implements OnInit {
  user: User | null = null;
  subscriptionPlan: SubscriptionPlan | null = null;
  userSubscriptions: UserSubscription[] = [];

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {    
    this.headerService.enableHeaderLogin();
    this.user = this.authService.getUserData();
    if (this.user) {
      this.getUser(this.user._id);
      console.log('user update ', this.user);
    }
  }

  getUser(userId: string): void {
    this.authService.getUser(userId).subscribe(
      (response) => {
        this.user = response.user;
        this.userSubscriptions = response.user.subscriptions;
        // this.subscriptionPlan = response.user.subscription.tier;
        this.authService.setUserData(response.user);
      },
      (error) => {
        console.log('Error Occurred', error);
      }
    );
  }
}

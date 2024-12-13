import { AuthService } from '../../Core/services/auth/auth.service';
import { HeaderService } from '../../Core/services/header/header.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrl: './team.component.css',
  providers: [MessageService],
})
export class TeamComponent implements OnInit {
  userData: any;
  referUsers: any[] = [];
  fullUrl: string = '';
  constructor(
    private headerService: HeaderService,
    private authService: AuthService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.headerService.enableHeaderLogin();
    this.userData = this.authService.getUserData();
    console.log('User Data:', this.userData); // Debugging log
    console.log(`User Name: ${this.userData?.name}`); // Log specific property
    this.getFullUrl();
    this.getRefererUsers();
  }
  getRefererUsers() {
    return this.authService.getRefererUsers(this.userData._id).subscribe(
      (response) => {
        console.log('succes', response);
        this.referUsers = response;
      },
      (error) => {
        console.log('error', error);
      }
    );
  }
  getFullUrl() {
    const url = 'www.localhost:4200/register/';
    this.fullUrl = url + this.userData.invitationCode;
    console.log(this.fullUrl);
  }
  copyIC() {
    navigator.clipboard
      .writeText(this.fullUrl)
      .then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Copied',
          detail: 'Invitation code copied to clipboard',
        });
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  }
}

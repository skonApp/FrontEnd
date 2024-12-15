import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../Core/services/header/header.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{
  constructor(private headerService:HeaderService){}
  ngOnInit(): void {
    this.headerService.enableHeaderLogin();
}
customers = [
  { name: 'John Doe', country: 'USA', company: 'Company A' },
  { name: 'Jane Smith', country: 'UK', company: 'Company B' },
  { name: 'Ali Khan', country: 'India', company: 'Company C' },
  { name: 'Maria Gonzalez', country: 'Mexico', company: 'Company D' },
  { name: 'William Brown', country: 'Canada', company: 'Company E' },
];

}

import { Component } from '@angular/core';
import { HeaderService } from '../../Core/services/header/header.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  constructor(private headerService: HeaderService) {}

  ngOnInit(){
    this.headerService.enableHeaderLogin();
  }
}

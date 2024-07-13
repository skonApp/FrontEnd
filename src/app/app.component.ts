import { Component } from '@angular/core';
import { HeaderService } from './Core/services/header/header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private headerService: HeaderService) {}
  title = 'skonApp';
  showHeader: boolean = true;
  showHeaderLogin: boolean = false;
  showFooter: boolean = true;

  ngOnInit(){
     this.headerService.showHeader$.subscribe(
       (show) => (this.showHeader = show)
     );
     this.headerService.showHeaderLogin$.subscribe(
       (show) => (this.showHeaderLogin = show)
     );
 
  }
}

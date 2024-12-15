import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { SidebarModule } from 'primeng/sidebar';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { LandingPageComponent } from './Features/landing-page/landing-page.component';
import { LoginComponent } from './Features/login/login.component';
import { PlanComponent } from './Features/plan/plan.component';
import { ChangePasswordComponent } from './Features/profile-setting/change-password/change-password.component';
import { DepositComponent } from './Features/profile-setting/deposit/deposit.component';
import { ProfileSettingComponent } from './Features/profile-setting/profile-setting.component';
import { RegistreComponent } from './Features/registre/registre.component';
import { TeamComponent } from './Features/team/team.component';
import { BottomTabNavComponent } from './Shared/components/bottom-tab-nav/bottom-tab-nav.component';
import { FooterComponent } from './Shared/components/footer/footer.component';
import { HeaderLoginComponent } from './Shared/components/header-login/header-login.component';
import { HeaderComponent } from './Shared/components/header/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AdminDashboardComponent } from './Features/admin-dashboard/admin-dashboard.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegistreComponent,
    HeaderLoginComponent,
    FooterComponent,
    LandingPageComponent,
    ProfileSettingComponent,
    TeamComponent,
    PlanComponent,
    ChangePasswordComponent,
    DepositComponent,
    BottomTabNavComponent,
    AdminDashboardComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SidebarModule,
    ButtonModule,
    AvatarModule,
    ToastModule,
    BrowserAnimationsModule,
    StyleClassModule,
    TableModule,
    DividerModule,
    FontAwesomeModule,
    DialogModule,
    SelectButtonModule,
    
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

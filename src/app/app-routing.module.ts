import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistreComponent } from './Features/registre/registre.component';
import { LoginComponent } from './Features/login/login.component';
import { LandingPageComponent } from './Features/landing-page/landing-page.component';
import { ProfileSettingComponent } from './Features/profile-setting/profile-setting.component';
import { authGuard } from './Core/auth.guard';
import { TeamComponent } from './Features/team/team.component';
import { PlanComponent } from './Features/plan/plan.component';
import { ChangePasswordComponent } from './Features/profile-setting/change-password/change-password.component';
import { AdminDashboardComponent } from './Features/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: 'home', component: LandingPageComponent, canActivate: [authGuard] },
  { path: 'register/:invitationCode', component: RegistreComponent },
  { path: 'register', component: RegistreComponent },
  { path: 'login', component: LoginComponent },
  { path: 'team', component: TeamComponent, canActivate: [authGuard] },
  { path: 'plan', component: PlanComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [authGuard] },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'profile',
    component: ProfileSettingComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

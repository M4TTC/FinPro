import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './globalcomponents/landing-page/landing-page.component';
import { LoginComponent } from './globalcomponents/login/login.component';
import { PageNotFoundComponent } from './globalcomponents/page-not-found/page-not-found.component';
import { SignupComponent } from './globalcomponents/signup/signup.component';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { UserDashboardComponent } from './userprofile/components/user-dashboard/user-dashboard.component';
import { UserSettingsComponent } from './userprofile/components/user-settings/user-settings.component';
import { UserSubscriptionComponent } from './userprofile/components/user-settings/user-subscription/user-subscription.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },

  {
    path: 'userprofile',
    loadChildren: () =>
      import('./userprofile/userprofile.module').then(
        (mod) => mod.UserprofileModule
      ),
  },
  {
    path: 'userprofile/dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'userprofile/settings',
    component: UserSettingsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'userprofile/subscription',
    component: UserSubscriptionComponent,
    canActivate: [AuthGuardService],
  },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

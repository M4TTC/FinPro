import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './globalcomponents/landing-page/landing-page.component';
import { LoginComponent } from './globalcomponents/login/login.component';
import { PageNotFoundComponent } from './globalcomponents/page-not-found/page-not-found.component';
import { SignupComponent } from './globalcomponents/signup/signup.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

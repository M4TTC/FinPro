import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';

@NgModule({
  declarations: [UserDashboardComponent, UserSettingsComponent],
  imports: [CommonModule],
  exports: [UserDashboardComponent],
})
export class UserprofileModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { UserprofileRouteingModule } from './userprofile-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';

import { MatTabsModule } from '@angular/material/tabs';
import { ChangePasswordComponent } from './components/user-settings/change-password/change-password.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { UserManagementComponent } from './components/user-settings/user-management/user-management.component';
import { UserSubscriptionComponent } from './components/user-settings/user-subscription/user-subscription.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    UserDashboardComponent,
    UserSettingsComponent,
    ChangePasswordComponent,
    UserManagementComponent,
    UserSubscriptionComponent,
  ],
  imports: [
    CommonModule,
    UserprofileRouteingModule,
    MatTabsModule,
    MatIconModule,
    MatProgressSpinnerModule,

    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatAutocompleteModule,
    MatTableModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatMenuModule,
    MatCardModule,
    MatGridListModule,
    MatExpansionModule,
  ],
  exports: [],
})
export class UserprofileModule {}

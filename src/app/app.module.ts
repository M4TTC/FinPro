import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Global Components
import { LandingPageComponent } from './globalcomponents/landing-page/landing-page.component';
import { NavbarComponent } from './globalcomponents/navbar/navbar.component';
import { SelectedPortfolioTableComponent } from './globalcomponents/selected-portfolio-table/selected-portfolio-table.component';
import { LoginComponent } from './globalcomponents/login/login.component';
import { SignupComponent } from './globalcomponents/signup/signup.component';
import { PageNotFoundComponent } from './globalcomponents/page-not-found/page-not-found.component';

//Angular Materials Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FindSymbolsComponent } from './globalcomponents/find-symbols/find-symbols.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingPageComponent,
    FindSymbolsComponent,
    SelectedPortfolioTableComponent,
    LoginComponent,
    SignupComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,

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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

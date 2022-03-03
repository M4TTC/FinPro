import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/loader/interceptor.service';
import { JwtModule } from '@auth0/angular-jwt';

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
import { MatMenuModule } from '@angular/material/menu';

export function tokenGetter() {
  return localStorage.getItem('jwt');
}
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
    MatMenuModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5200'],
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

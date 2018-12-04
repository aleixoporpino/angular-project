import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {NgxMaskModule} from 'ngx-mask';
// import 'hammerjs';

import {AppComponent} from './app.component';
import {AuthGuard} from './auth/auth.guard';
import {AuthService} from './auth/auth.service';
import {RegisterUserService} from './usuarios/register-user.service';
import {UserService} from './usuarios/user.service';
import {ContatoService} from './contatos/contato.service';
import {PatientService} from './patients/patient.service';
import {AppService} from './app.service';
import {TemplateContatoComponent} from './contatos/template-contato.component';
import {TemplateLoginComponent} from './login/template-login.component';
import {OAuthModule} from 'angular-oauth2-oidc';
import {Globals} from './globals';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import {PatientsComponent} from './patients/patients.component';


const appRoutes: Routes = [
  {path: 'contato', component: TemplateContatoComponent, canActivate: [AuthGuard]},
  {path: 'patient', component: PatientsComponent, canActivate: [AuthGuard]},
  {path: 'login', component: TemplateLoginComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}

];


@NgModule({
  declarations: [
    AppComponent,
    TemplateContatoComponent,
    TemplateLoginComponent,
    PatientsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    OAuthModule.forRoot(),
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    NgxMaskModule.forRoot()
  ],
  providers: [AuthGuard, AuthService, RegisterUserService, UserService, ContatoService, PatientService, Globals, CookieService, AppService],
  bootstrap: [AppComponent]
  ,
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ]
})
export class AppModule {
}

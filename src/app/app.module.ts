import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {NgxMaskModule} from 'ngx-mask';
import {AppComponent} from './app.component';
import {AuthGuard} from './auth/auth.guard';
import {AuthService} from './auth/auth.service';
import {UserService} from './users/user.service';
import {NurseService} from './nurses/nurse.service';
import {PatientService} from './patients/patient.service';
import {RecordsService} from './records/records.service';
import {AppService} from './app.service';
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
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import {PatientsComponent} from './patients/patients.component';
import {RecordsComponent} from './records/records.component';
import {NursesComponent} from './nurses/nurses.component';
// import 'hammerjs';


const appRoutes: Routes = [
  {path: 'patient', component: PatientsComponent, canActivate: [AuthGuard]},
  {path: 'nurse', component: NursesComponent, canActivate: [AuthGuard]},
  {path: 'login', component: TemplateLoginComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}

];


@NgModule({
  declarations: [
    AppComponent,
    TemplateLoginComponent,
    PatientsComponent,
    RecordsComponent,
    NursesComponent,
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
  providers: [AuthGuard, AuthService,
    NurseService, UserService, PatientService, Globals,
    CookieService, AppService, RecordsService],
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

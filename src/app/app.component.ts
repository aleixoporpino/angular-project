import {OAuthService} from 'angular-oauth2-oidc';
import {JwksValidationHandler} from 'angular-oauth2-oidc';
import {authConfig} from './config/auth.config';
import {Component} from '@angular/core';
import {AuthService} from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private oauthService: OAuthService, private authService: AuthService) {
    this.configureWithNewConfigApi();
  }

  private configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    //        this.oauthService.loadDiscoveryDocumentAndLogin();
  }

  /*checkAuthorization(): boolean {
      return this.appService.authenticated;
  }*/

  logout() {
    this.authService.logout();
  }
}

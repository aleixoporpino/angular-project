import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {HttpClientModule, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Globals} from './globals';

import {User} from './models/user.model';
import {UserService} from './usuarios/user.service';
import {AuthService} from './auth/auth.service';


@Injectable()
export class AppService {
  authenticated = false;

  constructor(
    private _router: Router, private _http: HttpClient,
    private cookieService: CookieService, private globals: Globals,
    private usuarioService: UserService, private authService: AuthService) {
  }

  obtainAccessToken(loginData) {
    const params = new URLSearchParams();
    params.append('username', loginData.username);
    params.append('password', loginData.password);
    params.append('grant_type', 'password');
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Basic ' + btoa('techlead-angular-frontend-agenda:techleadagenda')
    });

    this._http.post(this.globals.PUBLIC_URL + 'oauth/token',
      params.toString(), {headers: headers})
      .map(res => res)
      .subscribe(
        data => this.saveToken(data, loginData),
        err => alert('Usuário inexistente ou password inválida.'));
  }

  setUsuarioLogado(usuarioLogin: string) {
    /*this.usuarioService.buscarPorLogin(usuarioLogin).subscribe(usuario => {
      this.cookieService.set('id', usuario.id + '');
      this._router.navigate(['/contato']);
    });*/
  }

  saveToken(token, loginData: any) {
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    this.cookieService.set('access_token', token.access_token, expireDate);
    this.cookieService.set('userName', loginData.username, expireDate);
    this.setUsuarioLogado(loginData.username);
  }

  getResource(resourceUrl): Observable<User> {
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Bearer ' + this.cookieService.get('access_token')
    });
    return this._http.get(resourceUrl, {headers: headers})
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  checkCredentials() {
    /*if (!this.cookieService.check('access_token')) {
        this._router.navigate(['/login']);
        this.authenticated = false;
    } else {
        this.authenticated = true;
    }*/
    this.authenticated = true;
  }

  logout() {
    /*this.cookieService.delete('access_token');
    this.cookieService.delete('userName');
    this.cookieService.delete('id');
    this._router.navigate(['/login']);*/
    this.authService.logout();
  }
}

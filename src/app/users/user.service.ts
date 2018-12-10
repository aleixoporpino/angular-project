import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

import {Observable} from 'rxjs/Observable';

import {Globals} from '../globals';


import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {User} from '../models/user.model';
import {Patient} from '../models/patient.model';
import {HttpReturnMessage} from '../models/httpreturnmessage.model';

@Injectable()
export class UserService {

  private URL;

  constructor(
    protected httpClient: HttpClient, private cookieService: CookieService, private globals: Globals
  ) {
    this.URL = this.globals.PRIVATE_URL + 'user';
  }

  private static handleError(error: Response | any) {
    return Observable.throw(error);
  }

  public login(login: string, password: string): Observable<User> {
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
    });

    return this.httpClient.get(this.URL + '/login/' + login + '/' + password, {headers: headers})
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  public findAllDoctors(): Observable<Array<User>> {
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
    });

    return this.httpClient.get(this.URL + '/doctors', {headers: headers})
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  public save(user: User): Observable<HttpReturnMessage> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookieService.get('access_token')
    });

    return this.httpClient.post(this.URL + '/', user, {headers: headers})
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(alert('Error, contact the system administrator.') || error));

  }
}

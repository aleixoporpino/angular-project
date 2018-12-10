import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

import {Observable} from 'rxjs/Observable';

import {Globals} from '../globals';


import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {User} from '../models/user.model';
import {HttpReturnMessage} from '../models/httpreturnmessage.model';
import {AppService} from '../app.service';

@Injectable()
export class NurseService {

  private URL;

  constructor(
    protected httpClient: HttpClient, private cookieService: CookieService, private globals: Globals, private appService: AppService
  ) {
    this.URL = this.globals.PRIVATE_URL + 'nurse';
  }

  private static handleError(error: Response | any) {
    return Observable.throw(error);
  }


  public findAll(): Observable<Array<User>> {
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
    });

    return this.httpClient.get(this.URL + '/', {headers: headers})
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(alert('Error, contact the system administrator.') || error));
  }

  findByName(name: string): Observable<Array<User>> {
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
    });
    return this.httpClient.get(this.URL + '/' + name, {headers: headers})
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(alert('Error, contact the system administrator.') || error));
  }


  public save(nurse: User): Observable<HttpReturnMessage> {
    this.appService.checkCredentials();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookieService.get('access_token')
    });

    return this.httpClient.post(this.URL + '/', nurse, {headers: headers})
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(alert('Error, contact the system administrator.') || error));

  }

  public delete(nurse: User): Observable<HttpReturnMessage> {
    this.appService.checkCredentials();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookieService.get('access_token')
    });
    return this.httpClient.delete(this.URL + '/' + nurse.id, {headers: headers})
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(alert('Error, contact the system administrator.') || error));
  }

  public update(nurse: User): Observable<HttpReturnMessage> {
    this.appService.checkCredentials();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookieService.get('access_token')
    });
    return this.httpClient.put(this.URL + '/', nurse, {headers: headers})
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(alert('Error, contact the system administrator.') || error));
  }
}

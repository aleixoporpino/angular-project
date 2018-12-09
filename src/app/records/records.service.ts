import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {Record} from '../models/record.model';
import {HttpReturnMessage} from '../models/httpreturnmessage.model';
import {Globals} from '../globals';
import {AppService} from '../app.service';

@Injectable()
export class RecordsService {

  private URL = 'records';

  constructor(
    protected httpClient: HttpClient, private globals: Globals,
    private cookieService: CookieService, private appService: AppService
  ) {
    this.URL = globals.PRIVATE_URL + this.URL;
  }

  public save(record: Record): Observable<HttpReturnMessage> {
    this.appService.checkCredentials();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookieService.get('access_token')
    });

    return this.httpClient.post(this.URL + '/', record, {headers: headers})
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));

  }

  public delete(record: Record): Observable<HttpReturnMessage> {
    this.appService.checkCredentials();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookieService.get('access_token')
    });
    return this.httpClient.delete(this.URL + '/' + record.id, {headers: headers})
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  public findByPatientId(patientId: number): Observable<Array<Record>> {
    this.appService.checkCredentials();
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
    });
    return this.httpClient.get(this.URL + '/patient/' + patientId, {headers: headers})
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  public update(record: Record): Observable<HttpReturnMessage> {
    this.appService.checkCredentials();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookieService.get('access_token')
    });
    return this.httpClient.put(this.URL, record, {headers: headers})
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(alert('Error, contact the system administrator.') || error));
  }

}

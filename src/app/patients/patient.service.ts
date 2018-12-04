import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


import {Patient} from '../models/patient.model';
import {User} from '../models/user.model';
import {HttpReturnMessage} from '../models/httpreturnmessage.model';
import {Globals} from '../globals';
import {AppService} from '../app.service';

@Injectable()
export class PatientService {

  private URL = 'patients';
  private usuario = new User();

  constructor(
    protected httpClient: HttpClient, private globals: Globals,
    private cookieService: CookieService, private appService: AppService
  ) {
    this.URL = globals.PRIVATE_URL + this.URL;
  }

  public save(patient: Patient): Observable<HttpReturnMessage> {
    this.appService.checkCredentials();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookieService.get('access_token')
    });
    /*
patient.usuario = new User();
    patient.usuario.id = +this.cookieService.get('id');
*/
    return this.httpClient.post(this.URL + '/', patient, {headers: headers})
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));

  }

  public delete(patient: Patient): Observable<HttpReturnMessage> {
    this.appService.checkCredentials();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookieService.get('access_token')
    });
    return this.httpClient.delete(this.URL + '/' + patient.id, {headers: headers})
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  public findAll(): Observable<Array<Patient>> {
    this.appService.checkCredentials();
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Bearer ' + this.cookieService.get('access_token')
    });
    return this.httpClient.get(this.URL + '/', {headers: headers})
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  public findByName(name: String): Observable<Array<Patient>> {
    this.appService.checkCredentials();
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Bearer ' + this.cookieService.get('access_token')
    });

    return this.httpClient.get(this.URL + '/name/' + name, {headers: headers})
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));

  }

  public update(patient: Patient): Observable<HttpReturnMessage> {
    this.appService.checkCredentials();
    /*patient.usuario = new User();
    patient.usuario.id = +this.cookieService.get('id');*/
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookieService.get('access_token')
    });
    console.log(patient);
    return this.httpClient.put(this.URL + '/' + patient.id, patient, {headers: headers})
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(alert('Error, contact the system administrator.') || error));
  }

}

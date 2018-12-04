import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs/Observable';

import { Globals } from '../globals';


import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { User } from '../models/user.model';

@Injectable()
export class UserService {

    private URL;

    constructor(
        protected httpClient: HttpClient, private cookieService: CookieService, private globals: Globals
    ) {
        this.URL = this.globals.PRIVATE_URL + 'user';
    }

    private handleError(error: Response | any) {
        return Observable.throw(error);
    }

    public buscarPorLogin(login: string): Observable<User> {
        console.log(this.cookieService.get('access_token'));
        const headers = new HttpHeaders({
            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
            'Authorization': 'Bearer ' + this.cookieService.get('access_token')
        });

        return this.httpClient.get(this.URL + '/login/' + login, { headers: headers })
            .map((res: Response) => res)
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

}

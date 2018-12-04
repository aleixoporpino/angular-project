import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';


import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { User } from '../models/user.model';
import { HttpReturnMessage } from '../models/httpreturnmessage.model';
import { Globals } from '../globals';

@Injectable()
export class RegisterUserService {
    private URL = 'register';

    constructor(
        protected httpClient: HttpClient, private globals: Globals
    ) {
        this.URL = globals.PUBLIC_URL + this.URL;
    }

    private static handleError(error: Response | any) {
        console.error('ApiService::handleError', error);
        return Observable.throw(error);
    }

    public salvar(user: User): Observable<HttpReturnMessage> {
        return this.httpClient.post<HttpReturnMessage>(this.URL + '/save', user)
            .catch(RegisterUserService.handleError);
    }
}

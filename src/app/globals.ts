import {Injectable} from '@angular/core';
import {User} from './models/user.model';

@Injectable()
export class Globals {
  readonly PUBLIC_URL: string = 'http://localhost:8090/health/';
  readonly PRIVATE_URL: string = 'http://localhost:8090/health/api/';
  /*readonly PRIVATE_URL: string = 'https://etmp-group-project.herokuapp.com/mongo/';*/
  usuario: any;
  userName: String = 'Visitor';
}

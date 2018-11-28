import { Injectable } from '@angular/core';
import { User } from './models/user.model';

@Injectable()
export class Globals {
    readonly PUBLIC_URL: string = 'http://localhost:8090/agenda/';
    readonly PRIVATE_URL: string = 'http://localhost:8090/agenda/api/';
    usuario: any;
    usuarioNome: String = 'Visitante';
}

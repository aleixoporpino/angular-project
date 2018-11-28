import { User } from './user.model';

export class Contato {
    idContato: number;
    usuario: User;
    nome: string;
    sobrenome?: string;
    email?: string;
    endereco?: string;
    dataNascimento?: string;
    telefone?: string;
    celular?: string;
    celular2?: string;
}

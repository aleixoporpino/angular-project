import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AppService } from '../app.service';
import { RegisterUserService } from '../usuarios/register-user.service';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
    selector: 'app-template-login',
    templateUrl: './template-login.component.html',
    styleUrls: ['./template-login.component.css']
})
export class TemplateLoginComponent implements OnInit {
    alertMessage: String = '';
    boAlertMessage = false;

    isCadastrando = false;
    newUser: User;
    public loginData = { username: '', password: '' };

    constructor(private appService: AppService, private registroUsuarioService: RegisterUserService) { }

    ngOnInit() {

    }

    novoUsuarioForm(user: User) {
        this.isCadastrando = true;
        this.newUser = new User();
    }

    login() {
        this.appService.obtainAccessToken(this.loginData);
    }

    saveUser(user: User): void {
        this.registroUsuarioService
            .salvar(user)
            .subscribe((res) => {
                if (res.codigoErro === 0) {
                    this.alertMessage = res.mensagem;
                    this.boAlertMessage = true;
                    this.isCadastrando = false;
                } else if (res.codigoErro === 1) {
                    alert(res.mensagem);
                }
            });
    }

    cancelarCadastroUsuario() {
        this.isCadastrando = false;
    }

}

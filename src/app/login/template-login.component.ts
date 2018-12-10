import {Component, OnInit} from '@angular/core';
import {User} from '../models/user.model';
import {AuthService} from '../auth/auth.service';
import {UserService} from '../users/user.service';


@Component({
  selector: 'app-template-login',
  templateUrl: './template-login.component.html',
  styleUrls: ['./template-login.component.css']
})
export class TemplateLoginComponent implements OnInit {
  alertMessage: String = '';
  boAlertMessage = false;

  adding = false;
  newUser: User;
  public loginData = {username: '', password: ''};

  constructor(private authService: AuthService, private userService: UserService) {
  }

  ngOnInit() {

  }

  newUserForm(user: User) {
    this.adding = true;
    this.newUser = new User();
  }

  login() {
    const user = new User();
    user.login = this.loginData.username;
    user.password = this.loginData.password;
    this.authService.login(user);
  }

  saveUser(user: User): void {
    this.userService
      .save(user)
      .subscribe((res) => {
        if (res.codigoErro === 0) {
          this.alertMessage = res.mensagem;
          this.boAlertMessage = true;
          this.adding = false;
        } else if (res.codigoErro === 1) {
          alert(res.mensagem);
        }
      });
  }

  cancelUserForm() {
    this.adding = false;
  }

}

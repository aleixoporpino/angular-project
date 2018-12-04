import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {User} from '../models/user.model';
import {UserService} from '../usuarios/user.service';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class AuthService {
  private loggedIn = false;

  get isLoggedIn() {
    return this.cookieService.check('userId');
  }

  constructor(
    private router: Router,
    private userService: UserService,
    private cookieService: CookieService
  ) {
  }

  login(user: User) {
    if (user.login !== '' && user.password !== '') {
      this.userService.login(user.login, user.password).subscribe(loggedUser => {
        if (loggedUser != null) {
          const expireDate = new Date().getTime() + (1000 * 3600);
          console.log(new Date(expireDate));
          this.cookieService.set('userId', loggedUser.id + '', new Date(expireDate));
          this.cookieService.set('login', loggedUser.login + '', new Date(expireDate));
          this.loggedIn = true;
          this.router.navigate(['/patient']);
        } else {
          alert('Login or password invalid!');
        }
      });
    }
  }

  logout() {
    this.loggedIn = false;
    this.router.navigate(['/login']);
    this.cookieService.delete('userId');
    this.cookieService.delete('login');
  }
}

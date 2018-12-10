import {Component, OnInit} from '@angular/core';

import {Patient} from '../models/patient.model';
import {User} from '../models/user.model';
import {CrudOperation} from '../enums/crudOperation';
import {NurseService} from './nurse.service';
import {AppService} from '../app.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-nurses',
  templateUrl: './nurses.component.html',
  styleUrls: ['./nurses.component.css']
})
export class NursesComponent implements OnInit {
  nurses: User[] = [];

  searchName: String = '';

  alertMessage: String = '';
  boAlertMessage = false;

  crudOperation: CrudOperation = CrudOperation.LISTING;

  nurse: User = new User();

  constructor(private nurseService: NurseService,
              private cookieService: CookieService,
              private appService: AppService) {
  }

  ngOnAfterViewInit() {
    this.listAllNurses();
  }

  ngOnInit() {
    this.appService.checkCredentials();
    this.listAllNurses();
  }

  listAllNurses() {
    this.nurseService.findAll().subscribe(nurses => {
      this.nurses = nurses;
    });
  }


  findNurseByName(searchName: string) {
    if (searchName.length > 0) {
      this.nurseService.findByName(searchName).subscribe(nurses => {
        this.nurses = nurses;
      });
    } else {
      this.listAllNurses();
    }
  }

  newNurseForm(contato: Patient) {
    // Reseta o form se for editado um contato
    this.boAlertMessage = false;
    if (this.nurses.length) {
      this.nurse = new User();
    }
    this.crudOperation = CrudOperation.ADDING;
  }

  editNurseForm(nurse: User) {
    this.boAlertMessage = false;
    if (!nurse) {
      this.crudOperation = CrudOperation.LISTING;
      return;
    }
    this.crudOperation = CrudOperation.UPDATING;
    this.nurse = new User();
    this.nurse = nurse;
  }

  viewNurseForm(nurse: User) {
    this.boAlertMessage = false;
    this.crudOperation = CrudOperation.VIEWING;
    this.nurse = nurse;
  }

  saveNurse(nurse: User) {
    if (this.crudOperation === CrudOperation.ADDING) {
      this.nurseService
        .save(nurse)
        .subscribe((res) => {
          if (res.codigoErro === 0) {
            this.listAllNurses();
            this.crudOperation = CrudOperation.LISTING;
            this.nurse = nurse;
            this.boAlertMessage = true;
            this.alertMessage = res.mensagem;
          } else {
            alert(res.mensagem);
          }
        });
    } else {
      this.nurseService
        .update(nurse)
        .subscribe((res) => {
          if (res.codigoErro === 0) {
            this.listAllNurses();
            this.crudOperation = CrudOperation.LISTING;
            this.nurse = nurse;
            this.boAlertMessage = true;
            this.alertMessage = res.mensagem;
          } else {
            alert(res.mensagem);
          }
        });
    }

  }

  deleteNurse(nurse: User) {
    this.nurseService
      .delete(nurse)
      .subscribe((res) => {
        if (res.codigoErro === 0) {
          this.listAllNurses();
          this.crudOperation = CrudOperation.LISTING;
          this.boAlertMessage = true;
          this.alertMessage = res.mensagem;
        } else {
          alert(res.mensagem);
        }
      });

  }

  cancelFormNurse() {
    this.crudOperation = CrudOperation.LISTING;
    this.listAllNurses();
  }

  dismissAlert() {
    this.boAlertMessage = false;
  }
}

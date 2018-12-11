import {Component, OnInit} from '@angular/core';

import {Patient} from '../models/patient.model';
import {User} from '../models/user.model';
import {CrudOperation} from '../enums/crudOperation';
import {UserService} from '../users/user.service';
import {PatientService} from './patient.service';
import {CrudManager} from '../utils/crud.manager';
import {AppService} from '../app.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent extends CrudManager implements OnInit {
  patients: Patient[] = [];
  doctors: User[] = [];

  searchName: String = '';

  patient: Patient = new Patient();

  constructor(private patientService: PatientService, private userService: UserService,
              private appService: AppService, private cookieService: CookieService) {
    super();
  }

  initial() {
    this.appService.checkCredentials();
    this.userService.findAllDoctors().subscribe(doctors => {
      this.doctors = doctors;
    });
    this.listEntities();
  }

  ngOnInit() {
    this.posConstructor();
    console.log(this.crudOperation.value);
  }

  findPatientByName(searchName: string) {
    if (searchName.length > 0) {
      this.patientService.findByName(searchName).subscribe(patients => {
        this.patients = patients;
      });
    } else {
      this.listEntities();
    }
  }

  cancelOperation() {
    this.listEntities();
  }


  listEntities() {
    this.patientService.findDoctorId().subscribe(patients => {
      this.patients = patients;
      console.log(this.patients);
    });
  }

  newRegister() {
    this.patient = new Patient();
    this.patient.doctor = new User();
  }

  viewRegister(obj: any) {
    this.patient = obj as Patient;
  }

  editRegister(obj: any) {
    this.patient = obj as Patient;
    console.log(this.patient);
  }

  saveRegister() {
    if (this.crudOperation.value === CrudOperation.ADDING) {
      return new Promise(resolve => {
        console.log(this.patient);
        this.patientService
          .save(this.patient)
          .subscribe((res) => {
            if (res.codigoErro !== 0) {
              this.validatonError = true;
            }
            resolve();
          });
      });
    } else {
      return new Promise(resolve => {
        this.patientService
          .update(this.patient)
          .subscribe((res) => {
            if (res.codigoErro !== 0) {
              this.validatonError = true;
            }
            resolve();
          });
      });
    }
  }

  deleteRegister(obj: any) {
    return new Promise(resolve => {
      this.patientService
        .delete(obj as Patient)
        .subscribe((res) => {
          if (res.codigoErro !== 0) {
            this.validatonError = true;
            alert(res.mensagem);
          }
          resolve();
        });
    });
  }

}

class PatientsComponentImpl extends PatientsComponent {
}

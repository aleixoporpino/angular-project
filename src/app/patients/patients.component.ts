import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {CookieService} from 'ngx-cookie-service';

import {Patient} from '../models/patient.model';
import {User} from '../models/user.model';
import {CrudOperation} from '../enums/crudOperation';
import {UserService} from '../users/user.service';
import {AppService} from '../app.service';
import {PatientService} from './patient.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  patients: Patient[] = [];
  doctors: User[] = [];

  searchName: String = '';

  alertMessage: String = '';
  boAlertMessage = false;

  crudOperation: CrudOperation = CrudOperation.LISTING;

  patient: Patient = new Patient();

  constructor(private patientService: PatientService, private userService: UserService,
              private appService: AppService,
              private cookieService: CookieService, public dialog: MatDialog) {
  }

  ngOnAfterViewInit() {
    this.listPatients();
    this.listAllDoctors();
  }

  ngOnInit() {
    this.appService.checkCredentials();
    this.listPatients();
    this.listAllDoctors();
  }

  listPatients() {
    this.patientService.findDoctorId().subscribe(patients => {
      this.patients = patients;
    });
  }

  listAllDoctors() {
    this.userService.findAllDoctors().subscribe(doctors => {
      this.doctors = doctors;
    });
  }

  findPatientByName(searchName: string) {
    if (searchName.length > 0) {
      this.patientService.findByName(searchName).subscribe(patients => {
        this.patients = patients;
      });
    } else {
      this.listPatients();
    }
  }

  newPatientForm(contato: Patient) {
    // Reseta o form se for editado um contato
    this.boAlertMessage = false;
    if (this.patients.length) {
      this.patient = new Patient();
      this.patient.doctor = new User();
    }
    this.crudOperation = CrudOperation.ADDING;
  }

  editPatientForm(patient: Patient) {
    this.boAlertMessage = false;
    if (!patient) {
      this.crudOperation = CrudOperation.LISTING;
      return;
    }
    this.crudOperation = CrudOperation.UPDATING;
    this.patient = new Patient();
    this.patient = patient;
  }

  viewPatientForm(patient: Patient) {
    this.boAlertMessage = false;
    this.crudOperation = CrudOperation.VIEWING;
    this.patient = patient;
  }

  savePatient(patient: Patient) {
    if (this.crudOperation === CrudOperation.ADDING) {
      this.patientService
        .save(patient)
        .subscribe((res) => {
          if (res.codigoErro === 0) {
            this.listPatients();
            this.crudOperation = CrudOperation.LISTING;
            this.patient = patient;
            this.boAlertMessage = true;
            this.alertMessage = res.mensagem;
          } else {
            alert(res.mensagem);
          }
        });
    } else {
      this.patientService
        .update(patient)
        .subscribe((res) => {
          if (res.codigoErro === 0) {
            this.listPatients();
            this.crudOperation = CrudOperation.LISTING;
            this.patient = patient;
            this.boAlertMessage = true;
            this.alertMessage = res.mensagem;
          } else {
            alert(res.mensagem);
          }
        });
    }

  }

  deletePatient(patient: Patient) {
    this.patientService
      .delete(patient)
      .subscribe((res) => {
        if (res.codigoErro === 0) {
          this.listPatients();
          this.crudOperation = CrudOperation.LISTING;
          this.boAlertMessage = true;
          this.alertMessage = res.mensagem;
        } else {
          alert(res.mensagem);
        }
      });

  }

  cancelFormPatient() {
    this.crudOperation = CrudOperation.LISTING;
    this.listPatients();
  }

  dismissAlert() {
    this.boAlertMessage = false;
  }
}

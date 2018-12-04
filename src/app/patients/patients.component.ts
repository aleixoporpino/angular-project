import {Component, OnInit, AfterViewInit, Pipe, PipeTransform, Inject} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {CookieService} from 'ngx-cookie-service';

import {Patient} from '../models/patient.model';
import {User} from '../models/user.model';
import {Operacao} from '../enums/operacao';
/*import {ContatoService} from '../patients/patient.service';*/
import {AppService} from '../app.service';
import {PatientService} from '../patients/patient.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  patients: Patient[] = [];

  searchName: String = '';

  alertMessage: String = '';
  boAlertMessage = false;
  confirmacaoExclusao = false;

  operacao: Operacao = Operacao.LISTANDO;

  newPatient: any = {};

  constructor(private patientService: PatientService, private appService: AppService,
              private cookieService: CookieService, public dialog: MatDialog) {
  }

  ngOnAfterViewInit() {
    this.listPatients();
  }

  ngOnInit() {
    this.appService.checkCredentials();
    this.listPatients();
  }

  listPatients() {
    this.patientService.findAll().subscribe(patients => {
      this.patients = patients;
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
    if (this.patients.length) {
      this.newPatient = {};
    }
    this.operacao = Operacao.CADASTRANDO;
  }

  editPatientForm(patient: Patient) {
    if (!patient) {
      this.operacao = Operacao.LISTANDO;
      return;
    }
    this.operacao = Operacao.EDITANDO;
    this.newPatient = new Patient();
    this.newPatient = patient;
  }

  viewPatientForm(patient: Patient) {
    this.operacao = Operacao.VISUALIZANDO;
    this.newPatient = patient;
  }

  savePatient(patient: Patient) {
    /*const datePipe = new DatePipe('en-US');
    patient.dataNascimento = datePipe.transform(patient.dataNascimento, 'dd/MM/yyyy');*/
    console.log(patient);
    if (this.operacao === Operacao.CADASTRANDO) {
      this.patientService
        .save(patient)
        .subscribe((res) => {
          if (res.codigoErro === 0) {
            this.listPatients();
            this.operacao = Operacao.LISTANDO;
            this.newPatient = patient;
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
            this.operacao = Operacao.LISTANDO;
            this.newPatient = patient;
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
          this.operacao = Operacao.LISTANDO;
          this.boAlertMessage = true;
          this.alertMessage = res.mensagem;
        } else {
          alert(res.mensagem);
        }
      });

  }

  cancelFormPatient() {
    this.operacao = Operacao.LISTANDO;
    this.listPatients();
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {Patient} from '../models/patient.model';
import {CrudOperation} from '../enums/crudOperation';
import {Record} from '../models/record.model';

import {RecordsService} from './records.service';
import {UserService} from '../users/user.service';
import {NurseService} from '../nurses/nurse.service';
import {User} from '../models/user.model';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  @Input() patient: Patient;

  crudOperation: CrudOperation = CrudOperation.LISTING;

  records: Record[] = [];
  record: Record = new Record();

  nurses: User[] = [];

  alertMessage: String = '';
  boAlertMessage = false;

  constructor(private recordService: RecordsService, private userService: UserService,
              private nurseService: NurseService) {
  }

  ngOnInit() {
    this.listRecords();
    this.listNurses();
  }

  listRecords() {
    this.recordService.findByPatientId(this.patient.id).subscribe(records => {
      this.records = records;
    });
  }

  listNurses() {
    this.nurseService.findAll().subscribe(nurses => {
      this.nurses = nurses;
    });
  }

  newRecordForm() {
    this.boAlertMessage = false;
    this.record = new Record();
    this.record.nurse = new User();
    this.record.patient = this.patient;
    this.crudOperation = CrudOperation.ADDING;
  }

  editRecordForm(record: Record) {
    this.boAlertMessage = false;
    if (!record) {
      this.crudOperation = CrudOperation.LISTING;
      return;
    }
    this.crudOperation = CrudOperation.UPDATING;
    this.record = new Record();
    if (record.nurse == null) {
      record.nurse = new User();
    }
    record.date = new Date(record.date);
    this.record = record;

  }

  viewRecordForm(record: Record) {
    this.boAlertMessage = false;
    this.crudOperation = CrudOperation.VIEWING;
    if (record.nurse == null) {
      record.nurse = new User();
    }
    record.date = new Date(record.date);
    this.record = record;
  }

  saveRecord(record: Record) {
    console.log(record.date);
    if (this.crudOperation === CrudOperation.ADDING) {
      record.patient = this.patient;
      this.recordService
        .save(record)
        .subscribe((res) => {
          if (res.codigoErro === 0) {
            this.listRecords();
            this.crudOperation = CrudOperation.LISTING;
            this.record = record;
            this.alertMessage = res.mensagem;
          } else {
            alert(res.mensagem);
          }
        });
    } else {
      this.recordService
        .update(record)
        .subscribe((res) => {
          if (res.codigoErro === 0) {
            this.listRecords();
            this.crudOperation = CrudOperation.LISTING;
            this.record = record;
            this.boAlertMessage = true;
            this.alertMessage = res.mensagem;
          } else {
            alert(res.mensagem);
          }
        });
    }

  }

  deleteRecord(record: Record) {
    this.recordService
      .delete(record)
      .subscribe((res) => {
        if (res.codigoErro === 0) {
          this.listRecords();
          this.crudOperation = CrudOperation.LISTING;
          this.boAlertMessage = true;
          this.alertMessage = res.mensagem;
        } else {
          alert(res.mensagem);
        }
      });

  }

  cancelFormRecord() {
    this.crudOperation = CrudOperation.LISTING;
    this.listRecords();
  }

  dismissAlert() {
    this.boAlertMessage = false;
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {Patient} from '../models/patient.model';
import {CrudOperation} from '../enums/crudOperation';
import {Record} from '../models/record.model';

import {RecordsService} from './records.service';
import {User} from '../models/user.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  @Input() patient: Patient;
  @Input() addingNewRecord: BehaviorSubject<boolean>;

  crudOperation: CrudOperation = CrudOperation.LISTING;

  records: Record[] = [];
  record: Record = new Record();

  alertMessage: String = '';
  boAlertMessage = false;

  constructor(private recordService: RecordsService) {
  }

  ngOnInit() {
    this.listRecords();
  }

  listRecords() {
    this.recordService.findByPatientId(this.patient.id).subscribe(records => {
      this.records = records;
    });
  }

  newRecordForm() {
    // Reseta o form se for editado um contato
    if (this.records.length) {
      this.record = new Record();
      this.record.nurse = new User();
      this.record.patient = this.patient;
    }
    this.crudOperation = CrudOperation.ADDING;
    this.addingNewRecord.next(false);
  }

  editRecordForm(record: Record) {
    if (!record) {
      this.crudOperation = CrudOperation.LISTING;
      return;
    }
    this.crudOperation = CrudOperation.UPDATING;
    this.record = new Record();
    this.record = record;
    this.addingNewRecord.next(false);
  }

  viewRecordForm(record: Record) {
    this.crudOperation = CrudOperation.VIEWING;
    this.record = record;
    this.addingNewRecord.next(false);
  }

  saveRecord(record: Record) {
    if (this.crudOperation === CrudOperation.ADDING) {
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

  deletePatient(record: Record) {
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
    this.addingNewRecord.next(false);
    this.listRecords();
  }

}

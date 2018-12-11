import {CrudOperation} from '../enums/crudOperation';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export abstract class CrudManager {
  private _crudOperation = new BehaviorSubject<CrudOperation>(CrudOperation.LISTING);
  private _validatonError = false;
  private _isRedirect = false;
  private _boAlertMessage = false;
  private _alertMessage: string;

  abstract initial();

  abstract newRegister();

  abstract editRegister(obj: any);

  abstract viewRegister(obj: any);

  abstract cancelOperation();

  abstract listEntities();

  abstract deleteRegister(obj: any);

  abstract saveRegister();

  protected constructor() {
  }

  public posConstructor() {
    this._crudOperation.next(CrudOperation.LISTING);
    this._validatonError = false;
    this._isRedirect = false;
    this.initial();
  }

  public save() {
    try {
      this.saveRegister().then(res => {
        if (!this._validatonError && !this._isRedirect) {
          if (this._crudOperation.value === CrudOperation.UPDATING) {
            this.showEditSuccessMessage();
          } else if (this._crudOperation.value === CrudOperation.ADDING) {
            this.showAddSuccessMessage();
          }
          this.listEntities();

          this._crudOperation.next(CrudOperation.LISTING);
        }
        this._validatonError = false;
      });
    } catch (e) {
      console.log(e);
      this.showErrorMessage();
    }
  }

  public delete(obj: any) {
    try {
      this.deleteRegister(obj).then(res => {
        this.showDeleteSuccessMessage();
        this.listEntities();
        this._crudOperation.next(CrudOperation.LISTING);
      });
    } catch (e) {
      console.log(e);
      this.showErrorMessage();
    }
  }

  public new() {
    this._crudOperation.next(CrudOperation.ADDING);
    this.newRegister();
    this._isRedirect = false;
    this._boAlertMessage = false;
    this._alertMessage = '';
  }

  public edit(obj: any) {
    this._crudOperation.next(CrudOperation.UPDATING);
    this.editRegister(obj);
    this._isRedirect = false;
    this._boAlertMessage = false;
    this._alertMessage = '';
  }

  public view(obj: any) {
    this._crudOperation.next(CrudOperation.VIEWING);
    this.viewRegister(obj);
    this._isRedirect = false;
    this._boAlertMessage = false;
    this._alertMessage = '';
  }

  public cancel() {
    this._crudOperation.next(CrudOperation.LISTING);
    this.cancelOperation();
    this._isRedirect = false;
  }


  showAddSuccessMessage() {
    this._alertMessage = 'Saved successfully!';
    this._boAlertMessage = true;
  }

  showEditSuccessMessage() {
    this._alertMessage = 'Updated successfully!';
    this._boAlertMessage = true;
  }

  showDeleteSuccessMessage() {
    this._alertMessage = 'Deleted successfully!';
    this._boAlertMessage = true;
  }

  showErrorMessage() {
    this._alertMessage = 'Something not expected happened, contact the systems administrator.';
    this._boAlertMessage = true;
  }

  dismissAlert() {
    this._alertMessage = '';
    this._boAlertMessage = false;
  }


  get crudOperation(): BehaviorSubject<CrudOperation> {
    return this._crudOperation;
  }

  set crudOperation(value: BehaviorSubject<CrudOperation>) {
    this._crudOperation = value;
  }

  get validatonError(): boolean {
    return this._validatonError;
  }

  set validatonError(value: boolean) {
    this._validatonError = value;
  }

  get isRedirect(): boolean {
    return this._isRedirect;
  }

  set isRedirect(value: boolean) {
    this._isRedirect = value;
  }

  get boAlertMessage(): boolean {
    return this._boAlertMessage;
  }

  set boAlertMessage(value: boolean) {
    this._boAlertMessage = value;
  }

  get alertMessage(): string {
    return this._alertMessage;
  }

  set alertMessage(value: string) {
    this._alertMessage = value;
  }
}

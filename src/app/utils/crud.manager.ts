import {CrudOperation} from '../enums/crudOperation';

export abstract class CrudManager {
  private _crudOperation: CrudOperation = CrudOperation.LISTING;
  private _validatonError = false;
  private _isRedirect = false;
  private _boAlertMessage = false;
  private _alertMessage: string;

  abstract initial();

  abstract newRegister();

  abstract editRegister(obj: any);

  abstract viewRegister(obj: any);

  abstract cancelOperation();

  abstract list();

  abstract deleteRegister();

  abstract saveRegister();

  public posConstructor() {
    this.initial();
    this._crudOperation = CrudOperation.LISTING;
    this._validatonError = false;
    this._isRedirect = false;
  }

  public save() {
    try {
      this.saveRegister();
      if (!this._validatonError && !this._isRedirect) {
        if (this._crudOperation === CrudOperation.UPDATING) {
          this.showAddSuccessMessage();
        } else if (this._crudOperation === CrudOperation.ADDING) {
          this.showEditSuccessMessage();
        }
        this._crudOperation = CrudOperation.LISTING;
        this.list();
      }

      this._validatonError = false;
    } catch (e) {
      console.log(e);
      this.showErrorMessage();
    }
  }

  public delete() {
    try {
      this.deleteRegister();
      this.showDeleteSuccessMessage();
      this._crudOperation = CrudOperation.LISTING;
      this.list();
    } catch (e) {
      console.log(e);
      this.showErrorMessage();
    }
  }

  public new() {
    this._crudOperation = CrudOperation.ADDING;
    this.newRegister();
    this._isRedirect = false;
  }

  public edit(obj: any) {
    this._crudOperation = CrudOperation.UPDATING;
    this.editRegister(obj);
    this._isRedirect = false;
  }

  public view(obj: any) {
    this._crudOperation = CrudOperation.VIEWING;
    this.viewRegister(obj);
    this._isRedirect = false;
  }

  public cancel() {
    this._crudOperation = CrudOperation.LISTING;
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

}

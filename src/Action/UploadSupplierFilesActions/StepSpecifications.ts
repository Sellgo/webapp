// tslint:disable:max-classes-per-file
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { UploadSteps } from '../../constant/constant';
import { isValid, submit } from 'redux-form';

abstract class Step {
  constructor(public dispatch: ThunkDispatch<{}, {}, AnyAction>, public getState: () => any) {}
  abstract validate(): boolean;
  abstract cleanUp(): void;
}

export class AddNewSupplierStep extends Step {
  validate() {
    const state = this.getState();
    const isFormValid = isValid('supplier-info')(state);

    if (!isFormValid) {
      // submitting will make errors visible
      this.dispatch(submit('supplier-info'));
    }

    return isFormValid;
  }

  cleanUp() {}
}

export class SelectFileStep extends Step {
  validate() {
    return false;
  }

  cleanUp() {}
}

export class DataMappingStep extends Step {
  validate() {
    return false;
  }

  cleanUp() {}
}

export class DataValidationStep extends Step {
  validate() {
    return false;
  }

  cleanUp() {}
}

export function getStepSpecification(stepNumber: number) {
  switch (stepNumber) {
    case UploadSteps.AddNewSupplier:
      return AddNewSupplierStep;
      break;

    default:
      throw new Error('Step not defined');
      break;
  }
}

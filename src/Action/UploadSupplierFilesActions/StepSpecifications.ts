import { FieldsToMap } from './../../constant/constant';
import {
  columnMappingsSelector,
  reversedColumnMappingsSelector,
} from './../../selectors/UploadSupplierFiles/index';
// tslint:disable:max-classes-per-file
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { UploadSteps } from '../../constant/constant';
import { isValid, submit, getFormValues, destroy } from 'redux-form';
import { csvFileSelector } from '../../selectors/UploadSupplierFiles';
import { saveSupplierNameAndDescription } from '../SYNActions';
import { setRawCsv, removeColumnMappings } from '.';
import isNil from 'lodash/isNil';

export abstract class Step {
  constructor(public dispatch: ThunkDispatch<{}, {}, AnyAction>, public getState: () => any) {}
  abstract validate(): boolean;
  abstract cleanStep(): void;
  abstract step: number;
  finalizeStep?(): Promise<void>;
  cleanUp(targetStep: number) {
    this.cleanStep();

    if (this.step === targetStep || this.step === 0) {
      return;
    }

    const nextStepToClean = new (getStepSpecification(this.step - 1))(this.dispatch, this.getState);

    nextStepToClean.cleanUp(targetStep);
  }
}

export class AddNewSupplierStep extends Step {
  step = UploadSteps.AddNewSupplier;

  validate() {
    const state = this.getState();
    const isFormValid = isValid('supplier-info')(state);

    if (!isFormValid) {
      // submitting will make errors visible
      this.dispatch(submit('supplier-info'));
    }

    return isFormValid;
  }

  async finalizeStep() {
    const formValues: any = getFormValues('supplier-info')(this.getState());

    try {
      // add other form values
      const { supplierName, description } = formValues;

      await this.dispatch(saveSupplierNameAndDescription(supplierName, description));
    } catch (error) {
      throw error;
    }
  }

  cleanStep() {
    this.dispatch(destroy('supplier-info'));
  }
}

export class SelectFileStep extends Step {
  step = UploadSteps.SelectFile;

  validate() {
    const state = this.getState();
    const csvFile = csvFileSelector(state);

    return Boolean(csvFile);
  }

  cleanStep() {
    // remove file
    this.dispatch(setRawCsv('', null));

    // remove mappings
    this.dispatch(removeColumnMappings());
  }
}

export class DataMappingStep extends Step {
  step = UploadSteps.DataMapping;

  validate() {
    const reversedColumnMappings = reversedColumnMappingsSelector(this.getState());
    const requiredFieldsAreMapped = FieldsToMap.reduce((mappedCorrectly, fieldToMap) => {
      if (!mappedCorrectly) {
        return false;
      }

      if (!fieldToMap.required) {
        return true;
      }

      return !isNil(reversedColumnMappings[fieldToMap.key]);
    }, true);

    // todo: change to decent validation
    return requiredFieldsAreMapped;
  }

  cleanStep() {}
}

export class DataValidationStep extends Step {
  step = UploadSteps.DataValidation;

  validate() {
    return true;
  }

  cleanStep() {}
}

export function getStepSpecification(stepNumber: number) {
  switch (stepNumber) {
    case UploadSteps.AddNewSupplier:
      return AddNewSupplierStep;

    case UploadSteps.SelectFile:
      return SelectFileStep;

    case UploadSteps.DataMapping:
      return DataMappingStep;

    case UploadSteps.DataValidation:
      return DataValidationStep;

    default:
      throw new Error('Step not defined');
  }
}

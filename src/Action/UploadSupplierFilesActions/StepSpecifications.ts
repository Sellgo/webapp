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
import { error } from '../../utils/notifications';
import { saveSupplierNameAndDescription } from '../SYNActions';
import { setRawCsv, removeColumnMappings } from '.';
import isNil from 'lodash/isNil';

export abstract class Step {
  constructor(public dispatch: ThunkDispatch<{}, {}, AnyAction>, public getState: () => any) {}
  abstract validate(): string | undefined;
  abstract cleanStep(): void;
  abstract step: number;
  error(message: string) {
    error(message);
  }
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
    let errorMessage;

    if (!isFormValid) {
      // submitting will make errors visible
      this.dispatch(submit('supplier-info'));
      errorMessage = 'Please fill required fields';
    }

    return errorMessage;
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
    const fileSet = Boolean(csvFile);
    const errorMessage = fileSet ? undefined : 'Please select a csv file';

    return errorMessage;
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
    const unmappedFieldNames = FieldsToMap.filter(fieldToMap => fieldToMap.required)
      .filter(fieldToMap => isNil(reversedColumnMappings[fieldToMap.key]))
      .map(fieldToMap => fieldToMap.label);

    const requiredFieldsAreMapped = unmappedFieldNames.length === 0;

    return requiredFieldsAreMapped ? undefined : `Please map ${unmappedFieldNames.join(', ')}`;
  }

  cleanStep() {}
}

export class DataValidationStep extends Step {
  step = UploadSteps.DataValidation;

  validate() {
    return undefined;
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

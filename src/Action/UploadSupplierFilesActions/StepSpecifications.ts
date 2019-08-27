import { FieldsToMap } from './../../constant/constant';
import {
  columnMappingsSelector,
  reversedColumnMappingsSelector,
  csvSelector,
  isFirstRowHeaderSelector,
} from './../../selectors/UploadSupplierFiles/index';
// tslint:disable:max-classes-per-file
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { UploadSteps } from '../../constant/constant';
import { isValid, submit, getFormValues, destroy } from 'redux-form';
import { csvFileSelector } from '../../selectors/UploadSupplierFiles';
import { error } from '../../utils/notifications';
import { saveSupplierNameAndDescription, setsaveSupplierNameAndDescription } from '../SYNActions';
import { setRawCsv, removeColumnMappings } from '.';
import isNil from 'lodash/isNil';
import every from 'lodash/every';
import uniq from 'lodash/uniq';
import some from 'lodash/some';
import isEmpty from 'lodash/isEmpty';
import validator from 'validator';
import get from 'lodash/get';

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
      const existingSupplier = get(this.getState(), 'modals.uploadSupplier.meta', null);
      if (!existingSupplier) {
        // add other form values
        const { name, description } = formValues;

        await this.dispatch(saveSupplierNameAndDescription(name, description));
      } else {
        this.dispatch(setsaveSupplierNameAndDescription(existingSupplier));
      }
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
(window as any).test = validator.isDecimal;

export class DataMappingStep extends Step {
  step = UploadSteps.DataMapping;

  allFieldsMapped() {
    const reversedColumnMappings = reversedColumnMappingsSelector(this.getState());
    const unmappedFieldNames = FieldsToMap.filter(fieldToMap => fieldToMap.required)
      .filter(fieldToMap => isNil(reversedColumnMappings[fieldToMap.key]))
      .map(fieldToMap => fieldToMap.label);

    const requiredFieldsAreMapped = unmappedFieldNames.length === 0;

    return requiredFieldsAreMapped ? undefined : `Please map ${unmappedFieldNames.join(', ')}`;
  }

  validateFields() {
    const reversedColumnMappings = reversedColumnMappingsSelector(this.getState());
    const hasHeaders = isFirstRowHeaderSelector(this.getState());
    const csv = csvSelector(this.getState());

    // ignore first row if it is header
    const rows = hasHeaders ? csv.slice(1) : csv;

    const upc: string[] = [];
    const cost: string[] = [];

    rows.forEach(row => {
      upc.push(row[reversedColumnMappings.upc]);
      cost.push(row[reversedColumnMappings.cost]);
    });

    // validate cost
    if (!every(cost, value => validator.isDecimal(value.toString()))) {
      return 'cost must be a valid amount';
    }
    // validate upc
    if (!every(upc, validator.isNumeric)) {
      return 'upc must be numeric';
    }

    if (uniq(upc).length !== upc.length) {
      return 'upc must be unique';
    }

    if (some(upc, isEmpty)) {
      return 'upc can\'t be empty';
    }
  }

  validate() {
    return this.allFieldsMapped() || this.validateFields();
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

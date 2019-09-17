import { FieldsToMap } from './../../constant/constant';
import {
  reversedColumnMappingsSelector,
  csvSelector,
  isFirstRowHeaderSelector,
  skipColumnMappingCheckSelector,
} from './../../selectors/UploadSupplierFiles/index';
// tslint:disable:max-classes-per-file
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { UploadSteps } from '../../constant/constant';
import { isValid, submit, getFormValues, destroy } from 'redux-form';
import { csvFileSelector } from '../../selectors/UploadSupplierFiles';
import { error } from '../../utils/notifications';
import {
  saveSupplierNameAndDescription,
  postProductTrackGroupId,
  updateSupplierNameAndDescription,
} from '../SYNActions';
import { removeColumnMappings, fetchColumnMappings } from '.';
import isNil from 'lodash/isNil';
import findIndex from 'lodash/findIndex';
import isEmpty from 'lodash/isEmpty';
import validator from 'validator';
import get from 'lodash/get';
import { openUploadSupplierModal } from '../modals';

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
      const { name, description, ...other } = formValues;
      if (!existingSupplier) {
        // add other form values
        const data: any = await this.dispatch(
          saveSupplierNameAndDescription(name, description, other)
        );
        this.dispatch(postProductTrackGroupId(data.id, name));
        this.dispatch(openUploadSupplierModal(data));
      } else {
        for (let param in existingSupplier) {
          if (existingSupplier[param] === other[param]) {
            delete other[param];
          }
        }
        await this.dispatch(
          updateSupplierNameAndDescription(name, description, existingSupplier.id, other)
        );
        //this.dispatch(setsaveSupplierNameAndDescription(existingSupplier));
      }
      this.dispatch(fetchColumnMappings());
    } catch (error) {
      throw error;
    }
  }

  cleanStep() {
    // this.dispatch(destroy('supplier-info'));
  }
}

export class SelectFileStep extends Step {
  step = UploadSteps.SelectFile;

  checkFile() {
    const state = this.getState();
    const csvFile = csvFileSelector(state);
    const fileSet = Boolean(csvFile);
    const errorMessage = fileSet ? undefined : 'Please select a csv file';
    return errorMessage;
  }

  validateFields() {
    const reversedColumnMappings = reversedColumnMappingsSelector(this.getState());
    const hasHeaders = isFirstRowHeaderSelector(this.getState());
    const csv = csvSelector(this.getState());

    const labels = csv.length ? csv[0] : [];
    /* const hasHeaders = labels.every(e => e.match(/^[a-zA-Z]+$/) !== null);
    if (!hasHeaders) this.dispatch(toggleFirstRowHeader()); */
    const skipCheck = Object.keys(reversedColumnMappings).every(column => {
      const labelMapping = labels.filter(
        (label, i) => label.toLocaleLowerCase().indexOf(column.toLocaleLowerCase()) !== -1
      );
      const labelIndex = labels.indexOf(labelMapping.length ? labelMapping[0] : '');
      return labelMapping.length && reversedColumnMappings[column] === labelIndex ? true : false;
    });

    if (!skipCheck) {
      return 'Mismatch in Column Mappings. Unable to Skip Data Mapping!';
    }

    // ignore first row if it is header
    const rows = hasHeaders ? csv.slice(1) : csv;

    const upc: string[] = [];
    const cost: string[] = [];

    rows.forEach(row => {
      upc.push(row[reversedColumnMappings.upc]);
      cost.push(row[reversedColumnMappings.cost]);
    });

    let ix: number;

    // validate cost
    ix = findIndex(
      cost,
      value => !validator.isDecimal(value.toString()) && !validator.isInt(value.toString())
    );
    if (ix != -1) {
      return 'Cost must be a valid amount: Line ' + (hasHeaders ? ix + 2 : ix + 1);
    }

    // validate upc
    ix = findIndex(upc, value => isEmpty(value));
    if (ix != -1) {
      return "UPC can't be empty: Line " + (hasHeaders ? ix + 2 : ix + 1);
    }

    ix = findIndex(upc, value => !validator.isNumeric(value));
    if (ix != -1) {
      return 'UPC must be numeric: Line ' + (hasHeaders ? ix + 2 : ix + 1);
    }

    /* if (uniq(upc).length !== upc.length) {
      return 'upc must be unique';
    } */
  }

  validate() {
    const skipColumnMappingCheck = skipColumnMappingCheckSelector(this.getState());
    const errorCheck =
      this.checkFile() || (skipColumnMappingCheck ? this.validateFields() : undefined);
    if (!errorCheck && !skipColumnMappingCheck) {
      this.dispatch(removeColumnMappings());
      return;
    }
    return errorCheck;
  }

  cleanStep() {
    // remove file
    // this.dispatch(setRawCsv('', null));
    // remove mappings
    // this.dispatch(removeColumnMappings());
    this.dispatch(fetchColumnMappings());
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

    let ix: number;

    // validate cost
    ix = findIndex(
      cost,
      value => !validator.isDecimal(value.toString()) && !validator.isInt(value.toString())
    );
    if (ix != -1) {
      return 'Cost must be a valid amount: Line ' + (hasHeaders ? ix + 2 : ix + 1);
    }

    // validate upc
    ix = findIndex(upc, value => isEmpty(value));
    if (ix != -1) {
      return "UPC can't be empty: Line " + (hasHeaders ? ix + 2 : ix + 1);
    }

    ix = findIndex(upc, value => !validator.isNumeric(value));
    if (ix != -1) {
      return 'UPC must be numeric: Line ' + (hasHeaders ? ix + 2 : ix + 1);
    }

    /* if (uniq(upc).length !== upc.length) {
      return 'upc must be unique';
    } */
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

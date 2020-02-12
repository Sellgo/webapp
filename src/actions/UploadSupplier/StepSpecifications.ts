import { FieldsToMap } from '../../constants/UploadSupplier';
import {
  reversedColumnMappingsSelector,
  csvSelector,
  isFirstRowHeaderSelector,
  skipColumnMappingCheckSelector,
} from '../../selectors/UploadSupplier/index';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { UploadSteps } from '../../constants/UploadSupplier';
import { isValid, submit, getFormValues } from 'redux-form';
import { csvFileSelector } from '../../selectors/UploadSupplier';
import { error } from '../../utils/notifications';
import { saveSupplierNameAndDescription, updateSupplierNameAndDescription } from '../Suppliers';
import {
  removeColumnMappings,
  fetchColumnMappings,
  toggleFirstRowHeader,
  setSavedColumnMappings,
} from '.';
import isNil from 'lodash/isNil';
import findIndex from 'lodash/findIndex';
import isEmpty from 'lodash/isEmpty';
import validator from 'validator';
import get from 'lodash/get';
import { openUploadSupplierModal } from '../Modals';

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

  guessHasHeaders(csv: string[][]) {
    /** Adapted from Python's csv library: https://github.com/python/cpython/blob/master/Lib/csv.py#L383
     *  Creates a dictionary of types of data in each column. If any
     *  column is of a single type (say, integers), *except* for the first
     *  row, then the first row is presumed to be labels. If the type
     *  can't be determined, it is assumed to be a string in which case
     *  the length of the string is the determining factor: if all of the
     *  rows except for the first are the same length, it's a header.
     *  Finally, a 'vote' is taken at the end for each column, adding or
     *  subtracting from the likelihood of the first row being a header.
     */
    const rowsToCheck = 20; // arbitrary number of rows to check
    const header = csv.length ? csv[0] : []; // assume first row is header

    const columnTypes: { [index: number]: any } = {};
    header.map((_: any, index: number) => {
      columnTypes[index] = null;
    });

    csv
      .slice(1, rowsToCheck)
      .filter((row: any) => row.every((cell: any) => cell)) // skip row if there is a falsey cell - empty, undefined, ...
      .forEach((row: any) => {
        for (const col in columnTypes) {
          // check if data cell is a Number, else fallback to length of string
          const thisType = !Number.isNaN(Number(row[col])) ? Number : row[col].length;

          if (thisType !== columnTypes[col]) {
            if (columnTypes[col] === null) {
              //add new column type
              columnTypes[col] = thisType;
            } else {
              //type is inconsistent, remove column from consideration
              delete columnTypes[col];
            }
          }
        }
      });

    // compare results against first row and "vote" on whether it's a header
    let hasHeader = 0;
    for (let col in columnTypes) {
      const colType = columnTypes[col];
      if (typeof colType == 'number') {
        // it's a length
        hasHeader = header[col].length !== colType ? hasHeader + 1 : hasHeader - 1;
      } else {
        // check type different from data rows and header row
        hasHeader = !Number.isNaN(colType(header[col])) ? hasHeader - 1 : hasHeader + 1;
      }
    }

    return hasHeader > 0;
  }

  guessColumnMappings(csv: string[][]) {
    /**
     *  This function guesses column mappings based on whether a cell in the header row contains a specific keyword.
     *  Note: this function assumes that the first row of the csv is a header.
     *
     *  Potential future improvements:
     *    1) check header row against multiple keywords for each column
     *    2) guess from format of data rows
     */
    const header = csv.length ? csv[0] : []; // assume first row is header
    const reversedColumnMappings = reversedColumnMappingsSelector(this.getState());

    const mappings: string[] = [];
    header.forEach((headerCell: string) => {
      const mappingKeys = Object.keys(reversedColumnMappings);
      const keyIndex = mappingKeys.findIndex(
        (key: string) => headerCell.toLowerCase().includes(key.toLowerCase()) //find keyword in header cell
      );
      mappings.push(mappingKeys[keyIndex]);
    });

    return mappings;
  }

  validateFields() {
    const csv = csvSelector(this.getState());

    // Guess if csv file has headers
    const currentHasHeaders = isFirstRowHeaderSelector(this.getState());
    const hasHeaders = this.guessHasHeaders(csv);
    if (hasHeaders !== currentHasHeaders) this.dispatch(toggleFirstRowHeader());

    // Guess column mappings
    if (hasHeaders) {
      const mappings = this.guessColumnMappings(csv);
      if (mappings) {
        this.dispatch(setSavedColumnMappings(mappings));
      } else {
      }
    } else {
      // If no headers, clear all mappings instead.
      this.dispatch(removeColumnMappings());
    }

    return undefined;
  }

  validate() {
    const skipColumnMappingCheck = skipColumnMappingCheckSelector(this.getState());
    let errorCheck = this.checkFile();
    if (!errorCheck) errorCheck = skipColumnMappingCheck ? undefined : this.validateFields();
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

    // TODO: rather than fail on validation, just detect data quality issues -
    // Missing UPC / product cost / title / etc,
    // $ formats in cost
    // alphabets in UPC / cost,
    //
    // Then at the DataValidationStep, produce a report showing X rows processed & Y rows skipped for supplier Z.
    // And create a SubmitStep which is basically the current DataValidationStep

    // validate cost
    ix = findIndex(
      cost,
      value => !validator.isDecimal(value.toString()) && !validator.isInt(value.toString())
    );
    if (ix !== -1) {
      return 'Cost must be a valid amount: Line ' + (hasHeaders ? ix + 2 : ix + 1);
    }

    // validate upc
    ix = findIndex(upc, value => isEmpty(value));
    if (ix !== -1) {
      return "UPC can't be empty: Line " + (hasHeaders ? ix + 2 : ix + 1);
    }

    ix = findIndex(upc, value => !validator.isNumeric(value));
    if (ix !== -1) {
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

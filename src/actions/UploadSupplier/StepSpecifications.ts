import { FieldsToMap, UploadSteps } from '../../constants/UploadSupplier';
import {
  reversedColumnMappingsSelector,
  csvSelector,
  isFirstRowHeaderSelector,
  skipColumnMappingCheckSelector,
  csvFileSelector,
} from '../../selectors/UploadSupplier/index';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import { isValid, submit, getFormValues } from 'redux-form';

import { error } from '../../utils/notifications';
import {
  saveSupplierNameAndDescription,
  updateSupplierNameAndDescription,
  updateAddNewSearch,
  saveAddNewSearch,
} from '../Suppliers';
import {
  removeColumnMappings,
  fetchColumnMappings,
  toggleFirstRowHeader,
  setSavedColumnMappings,
  parseCsv,
} from '.';
import isNil from 'lodash/isNil';
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

export class AddNewSearchStep extends Step {
  step = UploadSteps.AddNewSearch;

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
    // eslint-disable-next-line no-useless-catch
    try {
      const existingSupplier = get(this.getState(), 'modals.uploadSupplier.meta', null);
      const { ...other } = formValues;

      if (!existingSupplier) {
        // add other form values
        const data: any = await this.dispatch(saveAddNewSearch(other));
        this.dispatch(openUploadSupplierModal(data));
      } else {
        for (const param in existingSupplier) {
          if (existingSupplier[param] === other[param]) {
            delete other[param];
          }
        }
        await this.dispatch(updateAddNewSearch(existingSupplier.id, other));
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

    // eslint-disable-next-line no-useless-catch
    try {
      const existingSupplier = get(this.getState(), 'modals.uploadSupplier.meta', null);
      const { nameSupplier, description, ...other } = formValues;

      if (!existingSupplier) {
        // add other form values
        const data: any = await this.dispatch(
          saveSupplierNameAndDescription(nameSupplier, description, other)
        );
        this.dispatch(openUploadSupplierModal(data));
      } else {
        for (const param in existingSupplier) {
          if (existingSupplier[param] === other[param]) {
            delete other[param];
          }
        }
        await this.dispatch(
          updateSupplierNameAndDescription(nameSupplier, description, existingSupplier.id, other)
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
    const csvArray = csvSelector(state);
    const fileSet = Boolean(csvFile) && Boolean(csvArray);
    const errorMessage = fileSet ? undefined : 'Please select a csv file';
    return errorMessage;
  }

  guessHasHeaders(csv: string[][]) {
    /*  Adapted from Python's csv library: https://github.com/python/cpython/blob/master/Lib/csv.py#L383
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
    header.forEach((_: any, index: number) => {
      columnTypes[index] = null;
    });

    csv.slice(1, rowsToCheck).forEach((row: any) => {
      for (const col in columnTypes) {
        if (row[col]) {
          // check if data cell is a Number, else fallback to length of string
          const thisType = !Number.isNaN(Number(row[col])) ? Number : row[col].length;

          if (thisType !== columnTypes[col]) {
            if (columnTypes[col] === null) {
              // add new column type
              columnTypes[col] = thisType;
            }
          }
        }
      }
    });

    // compare results against first row and "vote" on whether it's a header
    let hasHeader = 0;
    for (const col in columnTypes) {
      const colType = columnTypes[col];
      if (!colType) {
        continue;
      }

      if (typeof colType === 'number') {
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

    const mappings: string[] = [];
    header.forEach((headerCell: string) => {
      const mappingKeys = FieldsToMap.map(item => item.key);
      const keyIndex = mappingKeys.findIndex(
        (key: string) => headerCell.toLowerCase().includes(key.toLowerCase()) // find keyword in header cell
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
    if (hasHeaders !== currentHasHeaders) {
      this.dispatch(toggleFirstRowHeader());
    }

    // Guess column mappings
    if (hasHeaders) {
      const mappings = this.guessColumnMappings(csv);
      if (mappings) {
        this.dispatch(setSavedColumnMappings(mappings));
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
    if (!errorCheck) {
      errorCheck = skipColumnMappingCheck ? undefined : this.validateFields();
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
    return this.allFieldsMapped();
  }

  validate() {
    return this.validateFields();
  }

  cleanStep() {
    this.dispatch(parseCsv());
  }
}

export class SubmitStep extends Step {
  step = UploadSteps.Submit;

  validate() {
    return undefined;
  }

  cleanStep() {
    // do nothing
  }
}

export function getStepSpecification(stepNumber: number) {
  switch (stepNumber) {
    case UploadSteps.AddNewSearch:
      return AddNewSearchStep;

    case UploadSteps.AddNewSupplier:
      return AddNewSupplierStep;

    case UploadSteps.SelectFile:
      return SelectFileStep;

    case UploadSteps.DataMapping:
      return DataMappingStep;

    case UploadSteps.Submit:
      return SubmitStep;

    default:
      throw new Error('Step not defined');
  }
}

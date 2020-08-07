import { FieldsToMap, UploadSteps, PRODUCT_ID_TYPES } from '../../constants/UploadSupplier';
import {
  reversedColumnMappingsSelector,
  fileStringArraySelector,
  isFirstRowHeaderSelector,
  skipColumnMappingCheckSelector,
  fileDetailsSelector,
} from '../../selectors/UploadSupplier/index';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import { isValid, submit, getFormValues } from 'redux-form';

import { error } from '../../utils/notifications';
import { saveSupplierDetails, updateSupplierDetails, updateSearch, saveSearch } from '../Suppliers';
import { fetchColumnMappings, setColumnMappings, setPrimaryIdType } from '.';
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
        const data: any = await this.dispatch(saveSearch(other));
        this.dispatch(openUploadSupplierModal(data));
      } else {
        for (const param in existingSupplier) {
          if (existingSupplier[param] === other[param]) {
            delete other[param];
          }
        }
        await this.dispatch(updateSearch(existingSupplier.id, other));
      }
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
      const { ...other } = formValues;

      if (!existingSupplier) {
        // add other form values
        const data: any = await this.dispatch(saveSupplierDetails(other));
        this.dispatch(openUploadSupplierModal(data));
      } else {
        for (const param in existingSupplier) {
          if (existingSupplier[param] === other[param]) {
            delete other[param];
          }
        }
        await this.dispatch(updateSupplierDetails(existingSupplier.id, other));
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
    const fileDetails = fileDetailsSelector(state);
    const fileStringArray = fileStringArraySelector(state);
    const fileSet = Boolean(fileDetails) && Boolean(fileStringArray);
    const errorMessage = fileSet ? undefined : 'Please select a valid file';
    return errorMessage;
  }

  /**
   *  This function guesses the primary id type of the file based on whether a cell in the header
   * row contains a specific keyword.
   *  Note: this function assumes that the first row of the fileStringArray is a header.
   */
  guessPrimaryIdType(fileStringArray: string[][]) {
    const header = fileStringArray.length ? fileStringArray[0] : []; // assume first row is header

    for (const idType of PRODUCT_ID_TYPES) {
      const found =
        header.findIndex(headerCell =>
          String(headerCell)
            .toLowerCase()
            .includes(idType.toLowerCase())
        ) !== -1;

      if (found) return idType;
    }

    return null;
  }

  /**
   *  This function guesses column mappings based on whether a cell in the header row contains a specific keyword.
   *  Note: this function assumes that the first row of the fileStringArray is a header.
   *
   *  Potential future improvements:
   *
   *    1) check header row against multiple keywords for each column
   *
   *    2) guess from format of data rows
   */
  guessColumnMappings(fileStringArray: string[][], primaryIdType?: string) {
    const header = fileStringArray.length ? fileStringArray[0] : []; // assume first row is header

    const mappings: string[] = [];
    header.forEach((headerCell: string) => {
      const mappingKeys = FieldsToMap.map(item => item.key);
      if (headerCell) {
        const keyIndex = mappingKeys.findIndex((key: string) => {
          if (key === 'primary_id' && primaryIdType) {
            return String(headerCell)
              .toLowerCase()
              .includes(primaryIdType.toLowerCase());
          }
          return String(headerCell)
            .toLowerCase()
            .includes(key.toLowerCase()); // find keyword in header cell
        });
        mappings.push(mappingKeys[keyIndex]);
      }
    });

    return mappings;
  }

  validateFields() {
    const fileStringArray = fileStringArraySelector(this.getState());
    const hasHeaders = isFirstRowHeaderSelector(this.getState());
    if (hasHeaders) {
      const primaryIdType = this.guessPrimaryIdType(fileStringArray);
      let mappings;
      if (primaryIdType) {
        this.dispatch(setPrimaryIdType(primaryIdType));
        mappings = this.guessColumnMappings(fileStringArray, primaryIdType);
      } else {
        mappings = this.guessColumnMappings(fileStringArray);
      }
      if (mappings) {
        this.dispatch(setColumnMappings(mappings));
      }
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
    // do nothing
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

import { FieldsToMap, UploadSteps } from '../../constants/UploadSupplier';
import {
  reversedColumnMappingsSelector,
  fileStringArraySelector,
  isFirstRowHeaderSelector,
  fileDetailsSelector,
  primaryIdTypeSelector,
} from '../../selectors/UploadSupplier/index';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import { isValid, submit, getFormValues } from 'redux-form';

import { error } from '../../utils/notifications';
import { saveSupplierDetails, updateSupplierDetails, updateSearch } from '../Suppliers';
import { fetchColumnMappings, setColumnMappings, setPrimaryIdType } from '.';
import isNil from 'lodash/isNil';
import validator from 'validator';
import get from 'lodash/get';
import { openUploadSupplierModal } from '../Modals';
import { guessPrimaryIdType, guessColumnMappings } from '../../utils/file';

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

  checkFile() {
    const state = this.getState();
    const fileDetails = fileDetailsSelector(state);
    const fileStringArray = fileStringArraySelector(state);
    const fileSet = Boolean(fileDetails) && Boolean(fileStringArray);
    const errorMessage = fileSet ? undefined : 'Please select a valid file';
    return errorMessage;
  }

  guessMappings() {
    const fileStringArray = fileStringArraySelector(this.getState());
    const hasHeaders = isFirstRowHeaderSelector(this.getState());
    if (hasHeaders) {
      const primaryIdType = guessPrimaryIdType(fileStringArray);
      let mappings;
      if (primaryIdType) {
        this.dispatch(setPrimaryIdType(primaryIdType));
        mappings = guessColumnMappings(fileStringArray, primaryIdType);
      } else {
        mappings = guessColumnMappings(fileStringArray);
      }
      if (mappings) {
        this.dispatch(setColumnMappings(mappings));
      }
    }

    return undefined;
  }

  validate() {
    const state = this.getState();
    const isFormValid = isValid('supplier-info')(state);
    let errorMessage;
    const errorCheck = this.checkFile();

    if (!isFormValid) {
      // submitting will make errors visible
      this.dispatch(submit('supplier-info'));
      errorMessage = 'Please fill required fields';
    } else if (errorCheck) {
      errorMessage = errorCheck;
    }

    if (!errorCheck) {
      this.guessMappings();
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
        const supplierDetails: any = await this.dispatch(saveSupplierDetails(other));

        this.dispatch(openUploadSupplierModal({ ...supplierDetails }));
      } else {
        for (const param in existingSupplier) {
          if (existingSupplier[param] === other[param]) {
            delete other[param];
          }
        }
        await this.dispatch(updateSupplierDetails(existingSupplier.id, other));
        await this.dispatch(updateSearch(existingSupplier.id, other));
      }
    } catch (error) {
      throw error;
    }
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
      .map(fieldToMap =>
        fieldToMap.key === 'primary_id' ? primaryIdTypeSelector(this.getState()) : fieldToMap.label
      );

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

    case UploadSteps.DataMapping:
      return DataMappingStep;

    case UploadSteps.Submit:
      return SubmitStep;

    default:
      throw new Error('Step not defined');
  }
}

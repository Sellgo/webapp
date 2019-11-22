import React from 'react';
import { connect } from 'react-redux';
import styles from './UploadSupplier.module.css';
import { Button, Checkbox, Icon } from 'semantic-ui-react';
import {
  setUploadSupplierStep,
  setSaveColumnMappingSetting,
  setSkipColumnMappingCheck,
} from '../../../actions/UploadSupplier';
import {
  currentStepSelector,
  processCompletedSelector,
  saveColumnMappingSettingSelector,
  skipColumnMappingCheckSelector,
  columnMappingsSelector,
} from '../../../selectors/UploadSupplier';
import { closeUploadSupplierModal } from '../../../actions/Modals';

interface ActionsProps {
  currentStep: number;
  setStep: (nextStep: number) => void;
  setColumnSetting: (checked: boolean) => void;
  setSkipCheck: (checked: boolean) => void;
  saveColumnMappingSetting: boolean;
  skipColumnMappingCheck: boolean;
  columnMappings: any;
  className?: string;
  processCompleted: boolean;
  closeModal: typeof closeUploadSupplierModal;
}

const Actions = ({
  setStep,
  currentStep,
  className,
  processCompleted,
  closeModal,
  setColumnSetting,
  saveColumnMappingSetting,
  skipColumnMappingCheck,
  setSkipCheck,
  columnMappings,
}: ActionsProps) => {
  const onNextStep = () => setStep(currentStep + 1);
  const onPrevStep = () => setStep(currentStep - 1);
  const onSkipStep = () => setStep(currentStep + 2);

  const hasPrevStep = currentStep !== 0;
  const hasNextStep = currentStep !== 3;

  if (processCompleted) {
    return (
      <div className={`${className || ''} ${styles.actions}`}>
        <Button
          onClick={closeModal}
          className={styles.action}
          basic={true}
          color="black"
          primary={true}
        >
          Done
        </Button>
      </div>
    );
  }

  return (
    <div className={`${className || ''} ${styles.actions} ${styles.supplier_btns}`}>
      <div className={styles.downloadOptions}>
        {currentStep === 1 && (
          <a href="https://sellgo-public-dev.s3.amazonaws.com/template.csv" download>
            <Button size="small" basic={true} color="grey" style={{ borderRadius: 20 }}>
              <Icon name="cloud upload" color={'grey'} size="small" /> Download Template
            </Button>
          </a>
        )}
        {currentStep === 1 && columnMappings.length > 0 && (
          <Checkbox
            style={{ marginLeft: '1em' }}
            checked={skipColumnMappingCheck}
            onChange={(ev, data) => setSkipCheck(data.checked || false)}
            label="Skip Data Mapping"
          />
        )}
        {currentStep === 2 && (
          <Checkbox
            style={{ marginLeft: '1em' }}
            checked={saveColumnMappingSetting}
            onChange={(ev, data) => setColumnSetting(data.checked || false)}
            label="Save Data Map Setting"
          />
        )}
      </div>
      <div className={styles.btns_wrap}>
        {hasPrevStep && (
          <Button onClick={onPrevStep} className={styles.action} basic={true} color="grey">
            Previous
          </Button>
        )}
        {currentStep === 1 && (
          <Button onClick={closeModal} className={styles.action} basic={true} color="red">
            Dismiss
          </Button>
        )}
        {hasNextStep &&
          (currentStep === 1 && skipColumnMappingCheck ? (
            <Button
              onClick={onSkipStep}
              className={styles.action}
              basic={true}
              color="black"
              primary={true}
            >
              {'Finish'}
            </Button>
          ) : (
            <Button
              onClick={onNextStep}
              className={styles.action}
              basic={true}
              color="black"
              primary={true}
            >
              {currentStep === 0 ? 'Save & Proceed' : 'Next'}
            </Button>
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  currentStep: currentStepSelector(state),
  processCompleted: processCompletedSelector(state),
  skipColumnMappingCheck: skipColumnMappingCheckSelector(state),
  saveColumnMappingSetting: saveColumnMappingSettingSelector(state),
  columnMappings: columnMappingsSelector(state),
});

const mapDispatchToProps = {
  setStep: setUploadSupplierStep,
  closeModal: closeUploadSupplierModal,
  setColumnSetting: setSaveColumnMappingSetting,
  setSkipCheck: setSkipColumnMappingCheck,
};

export default connect(mapStateToProps, mapDispatchToProps)(Actions);

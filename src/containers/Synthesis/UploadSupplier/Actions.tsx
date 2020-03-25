import React from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, Icon } from 'semantic-ui-react';
import styles from './UploadSupplier.module.css';
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
  setStep: (nextStep: number) => Promise<void>;
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
  const onSkipStep = () => {
    setStep(currentStep + 1)
      .then(() => setStep(currentStep + 2))
      .catch(() => {
        // fail silently
      });
  };

  const hasPrevStep = currentStep !== 0;
  const hasNextStep = currentStep !== 3;

  if (processCompleted) {
    return (
      <div className={`${className || ''} ${styles.actions} submit-actions`}>
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
    <div
      className={`new-supplier-cont ${className || ''} ${styles.actions} ${
        styles['supplier-btns']
      }`}
    >
      <div className={styles['download-options']}>
        {currentStep === 1 && columnMappings.length > 0 && (
          <Checkbox
            className={styles.checked}
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
      <div className={`${styles['btns-wrap']} ${styles.upload}`}>
        {currentStep === 1 && (
          <a href="https://sellgo-public-dev.s3.amazonaws.com/template.csv" download>
            <Button size="small" basic={true} color="grey" style={{ borderRadius: 20 }}>
              <i className="fas fa-file-download" /> Download Template
            </Button>
          </a>
        )}
        {hasPrevStep && (
          <Button onClick={onPrevStep} className={styles.action} basic={true} color="grey">
            Previous
          </Button>
        )}
        {hasNextStep && (
          <Button
            onClick={currentStep === 1 && skipColumnMappingCheck ? onSkipStep : onNextStep}
            className={styles.action}
            basic={true}
            color="black"
            primary={true}
          >
            {(() => {
              switch (currentStep) {
                case 0:
                  return 'Save & Proceed';
                case 2:
                  return 'Submit';
                case 1:
                  return skipColumnMappingCheck ? 'Skip' : 'Next';
                default:
                  return 'Next';
              }
            })()}
          </Button>
        )}
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

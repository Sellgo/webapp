import React from 'react';
import { connect } from 'react-redux';
import styles from './UploadSupplierFiles.module.css';
import { Button, Checkbox, Icon } from 'semantic-ui-react';
import { setUploadSupplierStep } from '../../Action/UploadSupplierFilesActions';
import { currentStepSelector, processCompletedSelector } from '../../selectors/UploadSupplierFiles';
import { closeUploadSupplierModal } from '../../Action/modals';

interface ActionsProps {
  currentStep: number;
  setStep: (nextStep: number) => void;
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
    <div className={`${className || ''} ${styles.actions}`}>
      <div className={styles.downloadOptions}>
        {currentStep === 1 && (
          <div>
            <a href="https://sellgo-public-dev.s3.amazonaws.com/template.csv" download>
              <Button
                size="small"
                basic={true}
                color="grey"
                style={{ borderRadius: 20 }}
                onClick={() => console.log('download template')}
              >
                <Icon name="cloud upload" color={'grey'} size="small" /> Download Template
              </Button>
            </a>
            {/* <Checkbox
              style={{ marginLeft: '1em' }}
              onChange={onSkipStep}
              label="Skip Data Mapping "
            /> */}
          </div>
        )}
        {/* currentStep === 2 && (
          <Checkbox
            style={{ marginLeft: '1em' }}
            onChange={onSkipStep}
            label="Keep Data Map Setting "
          />
        ) */}
      </div>
      <div>
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
        {hasNextStep && (
          <Button
            onClick={onNextStep}
            className={styles.action}
            basic={true}
            color="black"
            primary={true}
          >
            {currentStep === 0 ? 'Save & Proceed' : 'Next'}
          </Button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  currentStep: currentStepSelector(state),
  processCompleted: processCompletedSelector(state),
});

const mapDispatchToProps = {
  setStep: setUploadSupplierStep,
  closeModal: closeUploadSupplierModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Actions);

import React from 'react';
import { connect } from 'react-redux';
import styles from './UploadSupplierFiles.module.css';
import { Button } from 'semantic-ui-react';
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

  const hasPrevStep = currentStep !== 0;
  const hasNextStep = currentStep !== 3;

  if (processCompleted) {
    return (
      <div className={`${className || ''} ${styles.actions}`}>
        <Button onClick={closeModal} className={styles.action}>
          Proceed
        </Button>
      </div>
    );
  }

  return (
    <div className={`${className || ''} ${styles.actions}`}>
      {hasPrevStep && (
        <Button onClick={onPrevStep} className={styles.action} basic={true} color="grey">
          Previous
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
          Next
        </Button>
      )}
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

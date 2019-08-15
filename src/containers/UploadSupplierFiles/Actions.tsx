import React from 'react';
import { connect } from 'react-redux';
import styles from './UploadSupplierFiles.module.css';
import { Button } from 'semantic-ui-react';
import { setUploadSupplierStep } from '../../Action/UploadSupplierFilesActions';
import { currentStepSelector } from '../../selectors/UploadSupplierFiles';

interface ActionsProps {
  currentStep: number;
  setStep: typeof setUploadSupplierStep;
}

const Actions = ({ setStep, currentStep }: ActionsProps) => {
  const onNextStep = () => setStep(currentStep + 1);
  const onPrevStep = () => setStep(currentStep - 1);

  return (
    <div className={styles.actions}>
      <Button onClick={onPrevStep} className={styles.action} basic={true} color="grey">
        Previous
      </Button>
      <Button
        onClick={onNextStep}
        className={styles.action}
        basic={true}
        color="black"
        primary={true}
      >
        Next
      </Button>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  currentStep: currentStepSelector(state),
});

const mapDispatchToProps = {
  setStep: setUploadSupplierStep,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Actions);

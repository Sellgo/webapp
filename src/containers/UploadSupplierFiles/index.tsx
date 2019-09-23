import React, { useEffect } from 'react';
import styles from './UploadSupplierFiles.module.css';
import { connect } from 'react-redux';
import UploadSteps from './UploadSteps';
import SupplierInformation from './SupplierInformation';
import Actions from './Actions';
import SelectFile from './SelectFile';
import DataMapping from './DataMapping';
import { currentStepSelector } from '../../selectors/UploadSupplierFiles';
import DataValidation from './DataValidation';
import FormWrapper from './FormWrapper';
import { cleanupUploadSupplier } from '../../actions/UploadSupplierFiles';

interface Props {
  currentStep: number;
  cleanupUploadSupplier: typeof cleanupUploadSupplier;
}

const Steps = [SupplierInformation, SelectFile, DataMapping, DataValidation];

export const UploadSupplierFiles = (props: Props) => {
  const { currentStep, cleanupUploadSupplier } = props;
  const StepComponent = Steps[currentStep];

  useEffect(() => {
    return () => {
      cleanupUploadSupplier();
    };
  }, []);
  return (
    <div className={styles.container}>
      <UploadSteps />
      <div className={styles.marginTop} />
      <div className={styles.section}>
        <FormWrapper>
          <StepComponent />
        </FormWrapper>
      </div>
      <div className={styles.marginTop} />
      <Actions />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  currentStep: currentStepSelector(state),
});

const mapDispatchToProps = {
  cleanupUploadSupplier,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadSupplierFiles);

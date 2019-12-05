import React, { useEffect } from 'react';
import styles from './UploadSupplier.module.css';
import { connect } from 'react-redux';
import UploadSteps from './UploadSteps';
import SupplierInformation from './SupplierInformation';
import Actions from './Actions';
import SelectFile from './SelectFile';
import DataMapping from './DataMapping';
import { currentStepSelector } from '../../../selectors/UploadSupplier';
import DataValidation from './DataValidation';
import FormWrapper from './FormWrapper';
import { cleanupUploadSupplier } from '../../../actions/UploadSupplier';

interface Props {
  currentStep: number;
  cleanupUploadSupplier: typeof cleanupUploadSupplier;
  isEditModal: boolean;
}

const Steps = [SupplierInformation, SelectFile, DataMapping, DataValidation];

export const UploadSupplier = (props: Props) => {
  const { currentStep, cleanupUploadSupplier, isEditModal } = props;
  const StepComponent = Steps[currentStep];

  useEffect(() => {
    return () => {
      cleanupUploadSupplier();
    };
  }, [cleanupUploadSupplier]);

  return (
    <div className={`${styles.container} ${styles.supply_container}`}>
      <UploadSteps isEditModal={isEditModal} />
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
)(UploadSupplier);

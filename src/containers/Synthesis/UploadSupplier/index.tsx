import React, { useState, useEffect } from 'react';
import styles from './UploadSupplier.module.css';
import { connect } from 'react-redux';
import UploadSteps from './UploadSteps';
import SupplierInformation from './SupplierInformation';
import Actions from './Actions';
import SelectFile from './SelectFile';
import DataMapping from './DataMapping';
import { currentStepSelector } from '../../../selectors/UploadSupplier';
import Submit from './Submit';
import FormWrapper from './FormWrapper';
import { cleanupUploadSupplier } from '../../../actions/UploadSupplier';

interface Props {
  currentStep: number;
  cleanupUploadSupplier: typeof cleanupUploadSupplier;
  isEditModal: boolean;
}

export const UploadSupplier = (props: Props) => {
  const [finished, setFinished] = useState(false);
  const { currentStep, cleanupUploadSupplier, isEditModal } = props;

  useEffect(() => {
    return () => {
      cleanupUploadSupplier();
    };
  }, [cleanupUploadSupplier]);

  return (
    <div className={`new-supp-container ${styles.container} ${styles['supply-container']}`}>
      <UploadSteps isEditModal={isEditModal} finished={finished} />
      <div className={`upload-section ${styles.section}`}>
        <FormWrapper>
          {currentStep === 0 && <SupplierInformation />}

          {currentStep === 1 && <SelectFile />}

          {currentStep === 2 && <DataMapping />}

          {currentStep === 3 && (
            <Submit
              onFinished={() => {
                setFinished(true);
              }}
            />
          )}
        </FormWrapper>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UploadSupplier);

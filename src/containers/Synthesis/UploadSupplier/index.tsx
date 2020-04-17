import React, { useState, useEffect } from 'react';
import styles from './UploadSupplier.module.css';
import { connect } from 'react-redux';
import UploadSteps from './UploadSteps';
import SupplierInformation from './SupplierInformation';
import Actions from './Actions';
import SelectFile from './SelectFile';
import DataMapping from './DataMapping';
import { currentStepSelector, currentProgressShow } from '../../../selectors/UploadSupplier';
import Submit from './Submit';
import FormWrapper from './FormWrapper';
import { cleanupUploadSupplier } from '../../../actions/UploadSupplier';
import AddNewSearch from './AddNewSearch';

interface Props {
  currentStep: number;
  cleanupUploadSupplier: typeof cleanupUploadSupplier;
  isEditModal: boolean;
  currentProgressShow: any;
}

export const UploadSupplier = (props: Props) => {
  const [finished, setFinished] = useState(false);
  const { currentStep, cleanupUploadSupplier, isEditModal, currentProgressShow } = props;

  useEffect(() => {
    return () => {
      cleanupUploadSupplier();
    };
  }, [cleanupUploadSupplier]);

  return (
    <div className={`new-supp-container ${styles.container} ${styles['supply-container']}`}>
      <UploadSteps isEditModal={isEditModal} finished={currentProgressShow ? finished : false} />
      <div className={`upload-section ${styles.section}`}>
        <FormWrapper>
          {currentStep === 0 && <AddNewSearch />}

          {currentStep === 1 && <SupplierInformation />}

          {currentStep === 2 && <SelectFile />}

          {currentStep === 3 && <DataMapping />}

          {currentStep === 4 && (
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
  currentProgressShow: currentProgressShow(state),
});

const mapDispatchToProps = {
  cleanupUploadSupplier,
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadSupplier);

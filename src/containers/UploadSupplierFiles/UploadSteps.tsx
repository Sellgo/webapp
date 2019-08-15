import React from 'react';
import get from 'lodash/get';
import { connect } from 'react-redux';
import Stepper from '../../components/Stepper';
import { setUploadSupplierStep } from '../../Action/UploadSupplierFilesActions';
import { currentStepSelector } from '../../selectors/UploadSupplierFiles';

interface Props {
  value: number;
  onChange: (newValue: number) => void;
}

const steps = [
  {
    title: 'Add New Supplier',
  },
  {
    title: 'Select File',
  },
  {
    title: 'Data Mapping',
  },
  {
    title: 'Data Validation',
  },
];

export const UploadSupplierFiles = (props: Props) => {
  const { value } = props;
  return (
    <Stepper {...props}>
      {({ Step }) =>
        steps.map((step, index) => (
          <Step
            key={step.title}
            title={step.title}
            disabled={index < value - 1 || index > value + 1}
          />
        ))
      }
    </Stepper>
  );
};

const mapStateToProps = (state: any) => {
  return {
    value: currentStepSelector(state),
  };
};

const mapDispatchToProps = {
  onChange: setUploadSupplierStep,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadSupplierFiles);

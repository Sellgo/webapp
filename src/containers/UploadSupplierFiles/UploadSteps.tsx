import React from 'react';
import { connect } from 'react-redux';
import Stepper from '../../components/Stepper';
import { setUploadSupplierStep } from '../../Action/UploadSupplierFilesActions';

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
  return (
    <Stepper {...props}>
      {({ Step }) => steps.map(step => <Step key={step.title} title={step.title} />)}
    </Stepper>
  );
};

const mapStateToProps = (state: any) => {
  return {
    value: state.settings.profile,
  };
};

const mapDispatchToProps = {
  onChange: setUploadSupplierStep,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadSupplierFiles);

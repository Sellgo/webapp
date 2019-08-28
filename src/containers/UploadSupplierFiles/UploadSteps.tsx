import React from 'react';
import get from 'lodash/get';
import { connect } from 'react-redux';
import Stepper from '../../components/Stepper';
import { setUploadSupplierStep } from '../../Action/UploadSupplierFilesActions';
import { currentStepSelector } from '../../selectors/UploadSupplierFiles';
import { Icon } from 'semantic-ui-react';
import styles from './UploadSupplierFiles.module.css';

interface Props {
  value: number;
  onChange: (newValue: number) => void;
}

const steps = [
  {
    title: 'Add New Supplier',
    icon: <Icon name="folder" />,
  },
  {
    title: 'Select File',
    icon: <Icon name="file" />,
  },
  {
    title: 'Data Mapping',
    icon: <Icon name="copy" />,
  },
  {
    title: 'Data Validation',
    icon: <Icon name="book" />,
  },
];

export const UploadSupplierFiles = (props: Props) => {
  const { value } = props;
  return (
    <Stepper className={styles.stepper} {...props}>
      {({ Step }) =>
        steps.map((step, index) => (
          <Step
            key={step.title}
            title={step.title}
            disabled={index < value - 1 || index > value + 1}
            icon={step.icon}
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

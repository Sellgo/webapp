import React from 'react';
import { connect } from 'react-redux';
import Stepper from '../../../components/Stepper';
import { setUploadSupplierStep } from '../../../actions/UploadSupplierFiles';
import { currentStepSelector } from '../../../selectors/UploadSupplierFiles';
import { Icon } from 'semantic-ui-react';
import styles from './UploadSupplierFiles.module.css';

interface Props {
  value: number;
  onChange: (newValue: number) => void;
}

const steps = [
  {
    title: 'Add New Supplier',
    icon: <Icon className="plus square" />,
  },
  {
    title: 'Select File',
    icon: <Icon name="file" />,
    description: '',
  },
  {
    title: 'Data Mapping',
    icon: <Icon name="copy" />,
    description: '',
  },
  {
    title: 'Data Validation',
    icon: <Icon name="book" />,
    description: '',
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
            description={step.description}
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

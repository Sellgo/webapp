import React from 'react';
import { connect } from 'react-redux';
import Stepper from '../../../components/Stepper';
import { setUploadSupplierStep } from '../../../actions/UploadSupplier';
import { currentStepSelector } from '../../../selectors/UploadSupplier';
import { Icon } from 'semantic-ui-react';
import styles from './UploadSupplier.module.css';

interface Props {
  value: number;
  onChange: (newValue: number) => void;
  isEditModal: boolean;
  finished: boolean;
}

const steps = [
  {
    title: 'Additional Info',
    icon: <i className="fas fa-pen-square" />,
  },
  {
    title: 'Select File',
    icon: <i className="fas fa-file-csv" />,
    description: '',
  },
  {
    title: 'Data Mapping',
    icon: <Icon name="copy" />,
    description: '',
  },
  {
    title: 'Data Validation',
    icon: <i className="fas fa-check-square" />,
    description: '',
  },
  {
    title: 'Submit',
    icon: <Icon name="upload" />,
    description: '',
  },
];

export const UploadSteps = (props: Props) => {
  const { value, isEditModal, finished } = props;

  return (
    <Stepper className={styles.stepper} {...props}>
      {({ Step }) =>
        steps.map((step, index) => (
          <Step
            key={step.title}
            title={
              !isEditModal
                ? step.title
                : step.title === 'Add New Supplier'
                ? 'Additional Info'
                : step.title
            }
            disabled={finished || index < value - 1 || index > value + 1}
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

export default connect(mapStateToProps, mapDispatchToProps)(UploadSteps);

import React from 'react';
import { connect } from 'react-redux';
import Stepper from '../../../components/Stepper';
import { setUploadSupplierStep } from '../../../actions/UploadSupplier';
import { currentStepSelector, currentShowProgress } from '../../../selectors/UploadSupplier';
import { Icon } from 'semantic-ui-react';
import styles from './UploadSupplier.module.css';

interface Props {
  value: number;
  onChange: (newValue: number) => void;
  showProgress: [];
  isEditModal: boolean;
  finished: boolean;
}

const steps = [
  {
    title: 'Add New Search',
    icon: <Icon className="plus square" />,
  },
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
    title: 'Upload',
    icon: <Icon name="check square" />,
    description: '',
  },
];

export const UploadSteps = (props: Props) => {
  const { value, isEditModal, finished, showProgress } = props;

  return (
    <Stepper
      className={showProgress ? `UploadSteps__disable ${styles.stepper}` : styles.stepper}
      {...props}
    >
      {({ Step }) =>
        steps.map((step, index) => (
          <Step
            key={step.title}
            title={
              !isEditModal
                ? step.title
                : step.title === 'Add New Supplier'
                ? 'Edit Supplier'
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
    showProgress: currentShowProgress(state),
  };
};

const mapDispatchToProps = {
  onChange: setUploadSupplierStep,
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadSteps);

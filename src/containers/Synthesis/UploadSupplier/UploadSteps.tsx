import React from 'react';
import { connect } from 'react-redux';
import Stepper from '../../../components/Stepper';
import { setUploadSupplierStep } from '../../../actions/UploadSupplier';
import { currentStepSelector, currentProgressShow } from '../../../selectors/UploadSupplier';
import { Icon } from 'semantic-ui-react';
import styles from './UploadSupplier.module.css';

interface Props {
  value: number;
  onChange: (newValue: number) => void;
  progressShow: [];
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
  const { value, isEditModal, finished, progressShow } = props;

  return (
    <Stepper
      className={progressShow ? `UploadSteps__disable ${styles.stepper}` : styles.stepper}
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
    progressShow: currentProgressShow(state),
  };
};

const mapDispatchToProps = {
  onChange: setUploadSupplierStep,
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadSteps);

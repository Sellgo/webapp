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
  // {
  //   title: 'Add New Search',
  //   icon: <Icon className="plus square" />,
  // },
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
                ? // ? 'Additional Info'
                  'Edit Supplier'
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadSteps);

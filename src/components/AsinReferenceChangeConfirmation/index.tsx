import React from 'react';

/* Components */
import FormFilterActions from '../FormFilters/FormFilterActions';

/* Styling */
import styles from './index.module.scss';

interface Props {
  handleCancel: () => void;
  handleSubmit: () => void;
}

const AsinReferenceChangeConfirmation = () => {
  const handleFind = () => {
    console.log('Find');
  };

  const handleReset = () => {
    console.log('Reset');
  };
  return (
    <div className={styles.referenceChangeForm}>
      <div className={styles.confirmMessage}>
        <h2>Change reference</h2>

        <p>Do you want to keep the items in the group tracked?</p>
      </div>

      <FormFilterActions
        submitLabel="Apply"
        resetLabel="Cancel"
        onFind={handleFind}
        onReset={handleReset}
        className={styles.formAction}
      />
    </div>
  );
};

export default AsinReferenceChangeConfirmation;

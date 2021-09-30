import React from 'react';
import { Button } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  onFind: () => void;
  onReset: () => void;
  disabled?: boolean;
  resetLabel?: string;
  submitLabel?: string;
  withSecondarySubmit?: boolean;
  className?: string;
  hideReset?: boolean;
}

const FormFilterActions: React.FC<Props> = props => {
  const {
    onFind,
    onReset,
    disabled = false,
    resetLabel = 'Reset',
    submitLabel = 'Find',
    className,
    withSecondarySubmit = false,
    hideReset = false,
  } = props;

  return (
    <div className={`${styles.formFilterActions} ${className}`}>
      {!hideReset && (
        <Button className={styles.formFilterActions__reset} onClick={onReset} size="small">
          {resetLabel}
        </Button>
      )}

      <Button
        className={`${
          withSecondarySubmit
            ? styles.formFilterActions__find__secondary
            : styles.formFilterActions__find
        }`}
        onClick={onFind}
        size="small"
        disabled={disabled}
      >
        {submitLabel}
      </Button>
    </div>
  );
};

export default FormFilterActions;

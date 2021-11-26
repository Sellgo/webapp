import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../ActionButton';

interface Props {
  onFind: () => void;
  onReset: () => void;
  onRestoreLastSearch?: () => void;
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
    onRestoreLastSearch,
    disabled = false,
    resetLabel = 'Reset',
    submitLabel = 'Find',
    className,
    withSecondarySubmit = false,
    hideReset = false,
  } = props;

  return (
    <div className={`${styles.formFilterActions} ${className}`}>
      {onRestoreLastSearch && (
        <ActionButton
          variant="secondary"
          type="black"
          size="md"
          onClick={onRestoreLastSearch}
          className={styles.restoreLastSearchButton}
        >
          Restore Last Search
        </ActionButton>
      )}

      <div className={styles.formSearchAndReset}>
        {!hideReset && (
          <ActionButton variant="reset" size="md" onClick={onReset}>
            {resetLabel}
          </ActionButton>
        )}

        <ActionButton
          variant={withSecondarySubmit ? 'secondary' : 'primary'}
          type="purpleGradient"
          disabled={disabled}
          size="md"
          onClick={onFind}
          className={styles.submitButton}
        >
          {submitLabel}
        </ActionButton>
      </div>
    </div>
  );
};

export default FormFilterActions;

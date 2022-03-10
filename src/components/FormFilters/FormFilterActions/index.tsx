import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../ActionButton';

interface Props {
  onFind: () => void;
  onReset: () => void;
  disabled?: boolean;
  resetLabel?: string;
  submitLabel?: string;
  withSecondarySubmit?: boolean;
  className?: string;
  hideReset?: boolean;
  isBlack?: boolean;
}

const FormFilterActions: React.FC<Props> = props => {
  const {
    onFind,
    onReset,
    disabled = false,
    resetLabel = 'Reset',
    submitLabel = 'Find',
    isBlack = false,
    className,
    withSecondarySubmit = false,
    hideReset = false,
  } = props;

  return (
    <div className={`${styles.formFilterActions} ${className}`}>
      <div className={styles.formSearchAndReset}>
        {!hideReset && (
          <ActionButton variant="reset" size="md" onClick={onReset}>
            {resetLabel}
          </ActionButton>
        )}

        <ActionButton
          variant={withSecondarySubmit ? 'secondary' : 'primary'}
          type={isBlack ? 'black' : 'purpleGradient'}
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

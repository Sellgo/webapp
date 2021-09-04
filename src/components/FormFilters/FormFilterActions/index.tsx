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
}

const FormFilterActions: React.FC<Props> = props => {
  const { onFind, onReset, disabled = false, resetLabel = 'Reset', submitLabel = 'Find' } = props;

  return (
    <div className={styles.formFilterActions}>
      <Button className={styles.formFilterActions__reset} onClick={onReset} size="small">
        {resetLabel}
      </Button>
      <Button
        className={styles.formFilterActions__find}
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

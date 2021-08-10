import React from 'react';
import { Button } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  onFind: () => void;
  onReset: () => void;
  disabled?: boolean;
}

const FormFilterActions: React.FC<Props> = props => {
  const { onFind, onReset, disabled } = props;

  return (
    <div className={styles.formFilterActions}>
      <Button className={styles.formFilterActions__reset} onClick={onReset} size="small">
        Reset
      </Button>
      <Button
        className={styles.formFilterActions__find}
        onClick={onFind}
        size="small"
        disabled={disabled}
      >
        Find
      </Button>
    </div>
  );
};

export default FormFilterActions;

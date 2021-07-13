import React from 'react';
import { Button } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  onFind: () => void;
  onReset: () => void;
}

const FormFilterActions: React.FC<Props> = props => {
  const { onFind, onReset } = props;

  return (
    <div className={styles.formFilterActions}>
      <Button className={styles.formFilterActions__reset} onClick={onReset} size="small">
        Reset
      </Button>
      <Button className={styles.formFilterActions__find} onClick={onFind} size="small">
        Find
      </Button>
    </div>
  );
};

export default FormFilterActions;

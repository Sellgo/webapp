import React, { memo } from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import UpgradeCTA from '../UpgradeCTA';

interface Props {
  error: string;
}

const TableErrorMessage = (props: Props) => {
  const { error } = props;
  return (
    <p className={styles.messageText}>
      {error}
      <UpgradeCTA type="Upgrade" />
    </p>
  );
};

export default memo(TableErrorMessage);

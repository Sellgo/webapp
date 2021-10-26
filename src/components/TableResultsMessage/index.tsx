import React, { memo } from 'react';
import { formatNumber } from '../../utils/format';

/* Styling */
import styles from './index.module.scss';

/* Components */
import UpgradeCTA from '../UpgradeCTA';

interface Props {
  appendMessage: string;
  count: number;
  actualCount?: number;
  prependMessage: string;
}

const TableResultsMessage = (props: Props) => {
  const { actualCount, count, prependMessage, appendMessage } = props;

  if (!actualCount) {
    return (
      <p className={styles.messageText}>
        {prependMessage} <span className={styles.count}>{formatNumber(count)}</span> {appendMessage}
        <UpgradeCTA type="Upgrade" />
      </p>
    );
  } else {
    return (
      <p className={styles.messageText}>
        {prependMessage} <span className={styles.count}>{formatNumber(actualCount)}</span> of{' '}
        <span className={styles.count}>{formatNumber(count)}</span> {appendMessage}
        <UpgradeCTA type="Upgrade" />
      </p>
    );
  }
};

export default memo(TableResultsMessage);

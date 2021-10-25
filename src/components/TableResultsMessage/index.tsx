import React, { memo } from 'react';
import { formatNumber } from '../../utils/format';

/* Styling */
import styles from './index.module.scss';

/* Components */
import UpgradeCTA from '../UpgradeCTA';

interface Props {
  appendMessage: string;
  count: number;
  prependMessage: string;
}

const TableResultsMessage = (props: Props) => {
  const { count, prependMessage, appendMessage } = props;

  return (
    <p className={styles.messageText}>
      {prependMessage} <span className={styles.count}>{formatNumber(count)}</span> {appendMessage}
      <UpgradeCTA type="Upgrade" />
    </p>
  );
};

export default memo(TableResultsMessage);

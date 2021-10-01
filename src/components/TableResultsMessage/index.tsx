import React, { memo } from 'react';
import { formatNumber } from '../../utils/format';

/* Styling */
import styles from './index.module.scss';

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
    </p>
  );
};

export default memo(TableResultsMessage);

import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Interface */
import { formatNumber, showNAIfNull, formatDecimal } from '../../../../../../utils/format';

interface Props {
  highlightZero?: boolean;
  rowData?: any;
  dataKey?: string;
}

const SingleStatBox = (props: Props) => {
  const { highlightZero, ...otherProps } = props;
  const { rowData, dataKey } = otherProps;

  const displayStat = showNAIfNull(rowData[`${dataKey}`], formatNumber(rowData[`${dataKey}`]));
  const displayChange = showNAIfNull(
    rowData[`${dataKey}_change`],
    formatDecimal(rowData[`${dataKey}_change`])
  );

  if (displayStat === '0' && highlightZero) {
    return (
      <div className={styles.displayStatWrapper}>
        <div className={styles.zeroStat}>0</div>
      </div>
    );
  }

  return (
    <div className={styles.displayStatWrapper}>
      <span className={styles.displayStat}>{displayStat}</span>
      <span
        className={`
          ${styles.change}
          ${parseFloat(displayChange) < 0 ? styles.change__negative : styles.change__positive}
        `}
      >
        {displayChange !== '0.00' && displayChange !== '-' ? `${displayChange}%` : ''}
      </span>
    </div>
  );
};

export default SingleStatBox;

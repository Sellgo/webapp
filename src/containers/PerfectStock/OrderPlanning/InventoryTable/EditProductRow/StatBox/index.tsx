import React from 'react';
import { formatNumber, formatDecimal } from '../../../../../../utils/format';

/* Styling */
import styles from './index.module.scss';

interface Props {
  title: string;
  stat: number;
  secondStat?: number;
  asFloat?: boolean;
  prepend?: string;
  secondPrepend?: string;
  append?: string;
  secondAppend?: string;
}

const StatBox = (props: Props) => {
  const { title, stat, asFloat, prepend, append, secondStat, secondPrepend, secondAppend } = props;
  const displayStat = asFloat ? formatDecimal(stat) : formatNumber(stat);
  const secondDisplayStat = asFloat ? formatDecimal(secondStat) : formatNumber(secondStat);

  return (
    <div className={styles.statBox}>
      <p className={styles.title}>{title}</p>
      <p className={styles.stat}>
        <span>
          {displayStat && prepend}
          {displayStat || '-'}
          {displayStat && append}
        </span>
        {secondStat && (
          <span>
            &nbsp;&nbsp;
            {secondDisplayStat && secondPrepend}
            {secondDisplayStat || '-'}
            {secondDisplayStat && secondAppend}
          </span>
        )}
      </p>
    </div>
  );
};

export default StatBox;

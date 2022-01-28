import React from 'react';
import { formatNumber, formatDecimal } from '../../../../../../utils/format';

/* Styling */
import styles from './index.module.scss';

interface Props {
  title: string;
  stat: number;
  asFloat?: boolean;
  prepend?: string;
  append?: string;
}

const StatBox = (props: Props) => {
  const { title, stat, asFloat, prepend, append } = props;
  const displayStat = asFloat ? formatDecimal(stat) : formatNumber(stat);
  return (
    <div className={styles.statBox}>
      <p className={styles.title}>{title}</p>
      <p className={styles.stat}>
        {prepend}
        {displayStat}
        {append}
      </p>
    </div>
  );
};

export default StatBox;

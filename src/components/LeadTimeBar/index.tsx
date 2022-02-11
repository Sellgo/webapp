import React, { memo } from 'react';
import { getLeadTimeColor, getLeadTimeName } from '../../constants/PerfectStock';
import { LeadTime } from '../../interfaces/PerfectStock/SalesProjection';

/* Styling */
import styles from './index.module.scss';

interface Props {
  leadTimes: LeadTime[];
  className?: string;
}

const LeadTimeBar = (props: Props) => {
  const { leadTimes, className } = props;
  const totalLeadTimes = leadTimes.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.duration;
  }, 0);

  return (
    <div className={`${styles.leadTimeBarWrapper} ${className}`}>
      {leadTimes.map((leadTime, index) => {
        return (
          <div
            key={index}
            className={styles.leadTimeSegment}
            style={{
              width: `${(leadTime.duration / totalLeadTimes) * 100}%`,
              background: getLeadTimeColor(leadTime.type),
            }}
          >
            <p>
              {getLeadTimeName(leadTime.type)}&nbsp;{leadTime.duration}D
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default memo(LeadTimeBar);

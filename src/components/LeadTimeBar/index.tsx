import React, { memo } from 'react';
import { getLeadTimeColor, getLeadTimeName } from '../../constants/PerfectStock';
import { LeadTime } from '../../interfaces/PerfectStock/SalesProjection';

/* Styling */
import styles from './index.module.scss';

interface Props {
  leadTimes: LeadTime[];
  className?: string;
  showDates?: boolean;
  startDate?: string;
}

const LeadTimeBar = (props: Props) => {
  const { leadTimes, className, showDates, startDate } = props;
  const currDate = startDate ? new Date(startDate) : new Date();
  const totalLeadTimes = leadTimes.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.duration;
  }, 0);

  return (
    <div className={`${styles.leadTimeBarWrapper} ${className}`}>
      {leadTimes.map((leadTime, index) => {
        /* Add leadTime.duration days to currDate */
        currDate.setDate(currDate.getDate() + leadTime.duration);
        return (
          <div
            className={styles.leadTimeSegmentWrapper}
            style={{
              width: `${(leadTime.duration / totalLeadTimes) * 100}%`,
              background: getLeadTimeColor(leadTime.type),
            }}
            key={index}
          >
            {/* Edge case for first date */}
            {showDates && startDate && index === 0 && (
              <div className={`${styles.dateWrapper} ${styles.dateWrapper__first}`}>
                <div className={styles.line} />
                <div className={styles.date}>
                  {new Date(startDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              </div>
            )}
            <div className={styles.leadTimeSegment}>
              <p>
                {getLeadTimeName(leadTime.type)}&nbsp;{leadTime.duration}D
              </p>
            </div>
            {showDates && startDate && (
              <div className={styles.dateWrapper}>
                <div className={styles.line} />
                <div className={styles.date}>
                  {currDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default memo(LeadTimeBar);

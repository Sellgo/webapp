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
  endDate?: string;
}

const LeadTimeBar = (props: Props) => {
  const { leadTimes, className, showDates, startDate, endDate } = props;
  const totalLeadTimes = leadTimes?.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.duration;
  }, 0);

  let currDate: Date;
  if (startDate) {
    currDate = startDate ? new Date(startDate) : new Date();
  } else if (endDate) {
    /* Curr date = end date minus total lead times */
    currDate = endDate ? new Date(endDate) : new Date();
    currDate.setDate(currDate.getDate() - totalLeadTimes);
  } else {
    currDate = new Date();
  }
  const firstDate = new Date(currDate.getTime());
  return (
    <div className={`${styles.leadTimeBarWrapper} ${className}`}>
      {leadTimes?.map((leadTime, index) => {
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
            {showDates && index === 0 && (
              <div className={`${styles.dateWrapper} ${styles.dateWrapper__first}`}>
                <div className={styles.line} />
                <div className={styles.date}>
                  {firstDate.toLocaleDateString('en-US', {
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
            {showDates && (
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

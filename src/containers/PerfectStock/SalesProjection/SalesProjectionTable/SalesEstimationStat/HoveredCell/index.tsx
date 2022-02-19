import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Utils */
import { prettyPrintDate } from '../../../../../../utils/format';

/* Assets */
import { ReactComponent as LinkIcon } from '../../../../../../assets/images/link.svg';
import { ReactComponent as UnlinkIcon } from '../../../../../../assets/images/unlink.svg';

interface Props {
  daysOffset: number;
  secondaryDaysOffset?: number;
  disabled: boolean;
  className?: string;
}

const HoveredCell = (props: Props) => {
  const { daysOffset, secondaryDaysOffset, disabled, className } = props;

  /* Generating dates for hovered content */
  let smallerDate;
  let largerDate;

  /* Past 90 days etc */
  if (daysOffset < 0 && !secondaryDaysOffset) {
    smallerDate = new Date();
    smallerDate.setTime(smallerDate.getTime() + daysOffset * 24 * 60 * 60 * 1000);
    largerDate = new Date();
  } else if (daysOffset < 0 && secondaryDaysOffset) {
    smallerDate = new Date();
    smallerDate.setTime(smallerDate.getTime() + daysOffset * 24 * 60 * 60 * 1000);
    largerDate = new Date();
    largerDate.setTime(largerDate.getTime() + secondaryDaysOffset * 24 * 60 * 60 * 1000);
    /* Next 30 days last year etc */
  } else {
    /* Smaller date is one year before today */
    smallerDate = new Date();
    smallerDate.setFullYear(smallerDate.getFullYear() - 1);
    largerDate = new Date();
    largerDate.setFullYear(largerDate.getFullYear() - 1);
    largerDate.setTime(largerDate.getTime() + daysOffset * 24 * 60 * 60 * 1000);
  }

  if (disabled) {
    return (
      <div className={`${styles.hoveredContent} ${styles.hoveredContent__disabled} ${className}`}>
        <div className={styles.date}>
          {prettyPrintDate(smallerDate)} -
          <br />
          {prettyPrintDate(largerDate)}
        </div>
        <LinkIcon />
      </div>
    );
  } else {
    return (
      <div className={`${styles.hoveredContent} ${className}`}>
        <div className={`${styles.date} ${styles.date__dark}`}>
          {prettyPrintDate(smallerDate)} -
          <br />
          {prettyPrintDate(largerDate)}
        </div>
        <UnlinkIcon />
      </div>
    );
  }
};

export default HoveredCell;

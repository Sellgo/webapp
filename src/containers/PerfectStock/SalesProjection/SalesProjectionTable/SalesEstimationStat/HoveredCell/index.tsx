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
  disabled: boolean;
}

const HoveredCell = (props: Props) => {
  const { daysOffset, disabled } = props;

  /* Dates for hovered content */
  let smallerDate;
  let largerDate;
  if (daysOffset < 0) {
    smallerDate = new Date();
    smallerDate.setDate(smallerDate.getDate() + daysOffset);
    largerDate = new Date();
  } else {
    smallerDate = new Date();
    largerDate = new Date();
    largerDate.setDate(largerDate.getDate() + daysOffset);
  }

  if (disabled) {
    return (
      <div className={styles.hoveredContent}>
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
      <div className={styles.hoveredContent}>
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

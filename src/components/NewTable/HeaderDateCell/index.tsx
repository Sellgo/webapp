import React from 'react';

/* Styling */
import styles from './index.module.scss';
import { UNIT_WIDTH } from '../../../constants/PerfectStock/OrderPlanning';

interface Props {
  title: string;
}

const HeaderDateCell = (props: Props) => {
  const { title } = props;

  let displayDate;
  if (title) {
    const headerDate = new Date(title);
    /* Display date in the format of 'mm/dd/yy' */
    displayDate = headerDate.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      timeZone: 'UTC',
    });
  } else {
    displayDate = '';
  }
  return (
    <div className={styles.headerDateCell} style={{ height: UNIT_WIDTH }}>
      {displayDate}
    </div>
  );
};

export default HeaderDateCell;

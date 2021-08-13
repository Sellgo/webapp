import React from 'react';
import { Icon } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  title: string;
  dataKey: string;
  currentSortColumn: string;
  currentSortType: 'asc' | 'desc' | undefined;
}

/* Header cell, Adds a sort icon beside the heading. */
const HeaderSortCell = (props: Props) => {
  const { title, dataKey, currentSortColumn, currentSortType } = props;
  /* Generating sort icon */
  let sortIcon;
  if (currentSortColumn === dataKey && currentSortType === 'asc') {
    sortIcon = (
      <div className={styles.sortIcon}>
        <Icon size="large" name="sort up" />
      </div>
    );
  } else if (currentSortColumn === dataKey && currentSortType === 'desc') {
    sortIcon = (
      <div className={styles.sortIcon}>
        <Icon size="large" name="sort down" />
      </div>
    );
  } else {
    sortIcon = (
      <div className={styles.sortIcon}>
        <Icon size="large" name="sort" />
      </div>
    );
  }

  return (
    <div className={styles.headerCell}>
      <p className={styles.headerText}>{title}</p>
      {sortIcon}
    </div>
  );
};

export default HeaderSortCell;

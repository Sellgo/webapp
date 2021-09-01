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

  const isCurrentlySorted = currentSortColumn === dataKey;
  const isAscendingSorted = currentSortType === 'asc' && isCurrentlySorted;
  const isDescendingSorted = currentSortType === 'desc' && isCurrentlySorted;

  return (
    <div className={styles.headerCell}>
      <p className={styles.headerText} style={{ color: isCurrentlySorted ? '#3b4557' : '#95A1AC' }}>
        {title}
      </p>
      <div className={styles.sortIconGroup}>
        <Icon
          size="large"
          name="triangle up"
          className={isAscendingSorted ? styles.activeSort : ''}
        />
        <Icon
          size="large"
          name="triangle down"
          className={isDescendingSorted ? styles.activeSort : ''}
        />
      </div>
    </div>
  );
};

export default React.memo(HeaderSortCell);

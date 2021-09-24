import React from 'react';

/* Styling */
import styles from './index.module.scss';

const TableGroups = () => {
  return (
    <div className={styles.tableGroupsWrapper}>
      <ul className={styles.groupList}>
        <li className={`${styles.groupListTab} ${styles.activeTab}`}>All Groups</li>
        <li className={styles.groupListTab}>Ungroup</li>
        <div className={styles.preventOverflow}>
          <li className={styles.groupListTab}>Group1</li>
          <li className={styles.groupListTab}>Group2</li>
        </div>
        <li className={styles.addGroupIconWrapper}>+</li>
      </ul>
    </div>
  );
};

export default TableGroups;

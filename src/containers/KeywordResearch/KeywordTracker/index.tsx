import React from 'react';

/* Styles */
import styles from './index.module.scss';

/* Containers */
import TrackerTableMeta from './TrackerTableMeta';
import TrackerProgress from './TrackerProgress';
import TrackerTable from './TrackerTable';

const KeywordTracker = () => {
  return (
    <main className={styles.keywordDatabasePage}>
      <TrackerTableMeta />
      <TrackerProgress />
      <TrackerTable />
    </main>
  );
};

export default KeywordTracker;

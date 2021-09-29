import React from 'react';

/* Styles */
import styles from './index.module.scss';

/* Containers */
import TrackerFilters from './TrackerFilters';
import TrackerProgress from './TrackerProgress';
import TrackerTableMeta from './TrackerTableMeta';
import TrackerTable from './TrackerTable';

const KeywordTracker = () => {
  return (
    <main className={styles.keywordDatabasePage}>
      <TrackerFilters />
      <TrackerProgress />
      <TrackerTableMeta />
      <TrackerTable />
    </main>
  );
};

export default KeywordTracker;

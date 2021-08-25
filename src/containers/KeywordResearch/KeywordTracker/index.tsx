import React from 'react';

/* Styles */
import styles from './index.module.scss';

/* Containers */
import TrackerFilters from './TrackerFilters';
import TrackerExport from './TrackerExport';
import TrackerProgress from './TrackerProgress';
import TrackerTable from './TrackerTable';

const KeywordTracker = () => {
  return (
    <main className={styles.keywordDatabasePage}>
      <TrackerFilters />
      <TrackerProgress />
      <TrackerExport />
      <TrackerTable />
    </main>
  );
};

export default KeywordTracker;

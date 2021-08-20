import React from 'react';

/* Styles */
import styles from './index.module.scss';

/* Containers */
import TrackerFilters from './TrackerFilters';
import TrackerExport from './TrackerExport';

const KeywordTracker = () => {
  return (
    <main className={styles.keywordDatabasePage}>
      <TrackerFilters />
      <TrackerExport />
    </main>
  );
};

export default KeywordTracker;

import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Containers */
import DatabaseFilters from './DatabaseFilters';

const KeywordDatabase = () => {
  return (
    <main className={styles.keywordDatabasePage}>
      <DatabaseFilters />
    </main>
  );
};

export default KeywordDatabase;

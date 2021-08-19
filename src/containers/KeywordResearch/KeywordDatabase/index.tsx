import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Containers */
import DatabaseFilters from './DatabaseFilters';
import DatabaseTable from './DatabaseTable';

const KeywordDatabase = () => {
  return (
    <main className={styles.keywordDatabasePage}>
      <DatabaseFilters />
      <DatabaseTable />
    </main>
  );
};

export default KeywordDatabase;

import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Containers */
import DatabaseFilters from './DatabaseFilters';
import DatabaseTable from './DatabaseTable';
import DatabaseExport from './DatabaseExport';

const KeywordDatabase = () => {
  return (
    <main className={styles.keywordDatabasePage}>
      <DatabaseFilters />
      <DatabaseExport />
      <DatabaseTable />
    </main>
  );
};

export default KeywordDatabase;

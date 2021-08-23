import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Containers */
import DatabaseFilters from './DatabaseFilters';
import DatabaseExport from './DatabaseExport';
import DatabaseKeywordList from './DatabaseKeywordList';
import DatabaseTable from './DatabaseTable';

const KeywordDatabase = () => {
  return (
    <main className={styles.keywordDatabasePage}>
      <DatabaseFilters />
      <DatabaseKeywordList />
      <DatabaseExport />
      <DatabaseTable />
    </main>
  );
};

export default KeywordDatabase;

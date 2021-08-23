import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Containers */
import DatabaseFilters from './DatabaseFilters';
import DatabaseProgress from './DatabaseProgress';
import DatabaseKeywordList from './DatabaseKeywordList';
import DatabaseExport from './DatabaseExport';
import DatabaseTable from './DatabaseTable';

const KeywordDatabase = () => {
  return (
    <main className={styles.keywordDatabasePage}>
      <DatabaseFilters />
      <DatabaseProgress />
      <DatabaseKeywordList />
      <DatabaseExport />
      <DatabaseTable />
    </main>
  );
};

export default KeywordDatabase;

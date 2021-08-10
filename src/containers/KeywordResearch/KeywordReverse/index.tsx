import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Containers */
import ReverseFilters from './ReverseFilters';
import ReverseTable from './ReverseTable';

const KeywordReverse = () => {
  return (
    <main className={styles.keywordReversePage}>
      <ReverseFilters />
      <ReverseTable />
    </main>
  );
};

export default KeywordReverse;

import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Containers */
import ReverseFilters from './ReverseFilters';

const KeywordReverse = () => {
  return (
    <main className={styles.keywordReversePage}>
      <ReverseFilters />
    </main>
  );
};

export default KeywordReverse;

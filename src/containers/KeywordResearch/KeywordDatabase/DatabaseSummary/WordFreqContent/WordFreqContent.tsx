import React, { memo } from 'react';
import { v4 as uuid } from 'uuid';

/* Styling */
import styles from './index.module.scss';

/* Interfaces */
import { KeywordDatabaseWordFreqSummary } from '../../../../../interfaces/KeywordResearch/KeywordDatabase';

/* Utils */
import { formatNumber } from '../../../../../utils/format';

interface Props {
  data: KeywordDatabaseWordFreqSummary[];
}

const WordFreqContent = (props: Props) => {
  const { data } = props;

  return (
    <ul className={styles.wordFreqList}>
      {data &&
        data.map(summary => {
          return (
            <li key={uuid()}>
              <span>{summary.word}</span>
              <span>{formatNumber(summary.frequency)}</span>
            </li>
          );
        })}
    </ul>
  );
};

export default memo(WordFreqContent);

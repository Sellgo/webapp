import React from 'react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  title: string;
  subTitle: React.ReactNode;
  content: React.ReactNode;
}

const KeywordDatabaseSummaryCards = (props: Props) => {
  const { title, subTitle, content } = props;

  return (
    <div className={styles.summaryCards}>
      <h2 className={styles.summaryCardTitle}>{title}</h2>

      <div className={styles.contentWrapper}>
        {subTitle}
        <div className={styles.mainContent}>{content}</div>
      </div>
    </div>
  );
};

export default KeywordDatabaseSummaryCards;

import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Assets */
import sellgoLoader from '../../assets/images/sellgo-loading-animation-450-1.gif';

interface Props {
  title: string;
  subTitle: React.ReactNode;
  content: React.ReactNode;
  isLoading: boolean;
}

const KeywordDatabaseSummaryCards = (props: Props) => {
  const { title, subTitle, isLoading, content } = props;

  return (
    <div className={styles.summaryCards}>
      <h2 className={styles.summaryCardTitle}>{title}</h2>

      <div className={styles.contentWrapper}>
        {subTitle}
        <div className={styles.mainContent}>
          {isLoading ? (
            <div className={styles.sellgoLoader}>
              <img
                src={sellgoLoader}
                alt="Sellgo Loader Animaion"
                className={styles.sellgoLoader}
              />
            </div>
          ) : (
            content
          )}
        </div>
      </div>
    </div>
  );
};

export default KeywordDatabaseSummaryCards;

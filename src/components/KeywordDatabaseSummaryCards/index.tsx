import React, { memo } from 'react';

/* Styling */
import styles from './index.module.scss';

/* Assets */
import sellgoLoader from '../../assets/images/sellgo-loading-animation-450-1.gif';
import { Icon } from 'semantic-ui-react';

interface Props {
  title: string;
  subTitle: React.ReactNode;
  content: React.ReactNode;
  isLoading: boolean;
  sort?: 'asc' | 'desc';
}

const KeywordDatabaseSummaryCards = (props: Props) => {
  const { title, isLoading, content, sort } = props;
  const isAscendingSorted = sort === 'asc';
  const isDescendingSorted = sort === 'desc';

  return (
    <div className={styles.summaryCards}>
      <h2 className={styles.summaryCardTitle}>{title}</h2>
      <div className={styles.sortIconGroup}>
        <Icon
          size="large"
          name="triangle up"
          className={isAscendingSorted ? styles.activeSort : styles.inActiveSort}
        />
        <Icon
          size="large"
          name="triangle down"
          className={isDescendingSorted ? styles.activeSort : styles.inActiveSort}
        />
      </div>
      <div className={styles.contentWrapper}>
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

export default memo(KeywordDatabaseSummaryCards);

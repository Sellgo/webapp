import React, { memo } from 'react';
import { Button, Icon, Popup } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import Placeholder from '../../components/Placeholder';

interface Props {
  title: string;
  content: React.ReactNode;
  isLoading: boolean;
  handleSort: () => void;
  handleCopy?: (deliminator?: string) => void;
  sort?: 'asc' | 'desc';
}

const KeywordDatabaseSummaryCards = (props: Props) => {
  const { title, isLoading, handleSort, handleCopy, content, sort } = props;
  const [copied, setCopied] = React.useState(false);
  const isAscendingSorted = sort === 'asc';
  const isDescendingSorted = sort === 'desc';

  const handleCopyKeywords = (deliminator?: string) => {
    if (handleCopy) {
      handleCopy(deliminator);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  };
  return (
    <div className={styles.summaryCards}>
      <div className={styles.summaryHeader}>
        <h2 className={styles.summaryCardTitle} onClick={handleSort}>
          {title}
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
        </h2>
        {handleCopy && (
          <div className={styles.copyButton}>
            {!copied ? (
              <Icon
                name="copy outline"
                onClick={() => handleCopyKeywords(',')}
                className={styles.copyIcon}
              />
            ) : (
              <Icon name="check circle" data-title="Copied" color="green" size="small" />
            )}
            <Popup
              on="click"
              position="bottom right"
              offset="10"
              closeOnDocumentClick
              closeOnEscape
              className={styles.actionsPopover}
              content={
                <>
                  <div className={styles.actionOptions}>
                    <button onClick={() => handleCopyKeywords(',')} disabled={false}>
                      <Icon name="copy outline" />
                      <span>Copy Keywords in rows</span>
                    </button>

                    <button onClick={() => handleCopyKeywords('\n')} disabled={false}>
                      <Icon name="copy outline" />
                      <span>Copy Keywords in columns</span>
                    </button>
                  </div>
                </>
              }
              trigger={
                <Button
                  icon="chevron down"
                  className={`${styles.iconButton} iconButtonResetGlobal`}
                />
              }
            />
          </div>
        )}
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.mainContent}>
          {isLoading ? <Placeholder numberParagraphs={2} numberRows={1} /> : content}
        </div>
      </div>
    </div>
  );
};

export default memo(KeywordDatabaseSummaryCards);

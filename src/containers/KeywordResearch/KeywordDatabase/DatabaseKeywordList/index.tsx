import React, { useState } from 'react';
import { Icon, TextArea } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Componensts */
import InputFilter from '../../../../components/FormFilters/InputFilter';

/* Constants */
import { MAX_KEYWORDS_ALLOWED } from '../../../../constants/KeywordResearch/KeywordDatabase';

const DatabaseKeywordList = () => {
  const [keywords, setKeywords] = useState<string>('keyword1,keyword2');
  const [isTextArea, setIsTextArea] = useState<boolean>(false);

  const totalKeywords = keywords ? keywords.split(',').length : 0;

  return (
    <section className={styles.keywordListWrapper}>
      <p>{MAX_KEYWORDS_ALLOWED - totalKeywords} more keywords allowed.</p>
      <Icon
        name={isTextArea ? 'chevron down' : 'chevron right'}
        className={styles.toggleInputIcon}
        onClick={() => setIsTextArea(prevState => !prevState)}
      />

      {!isTextArea && (
        <div className={styles.commaSeperatedInput}>
          <InputFilter
            placeholder="Enter keyword seperated by comma"
            value={keywords}
            handleChange={value => setKeywords(value)}
            className={styles.longInput}
          />
        </div>
      )}

      {isTextArea && (
        <div className={styles.newLineSeperatedInput}>
          <TextArea
            placeholder="Enter upto 200 keywords (1 per line) ..."
            className={styles.textInput}
            value={keywords.split(',').join('\n')}
            onChange={(e: any, { value }: any) => setKeywords(value.split('\n').join(','))}
          />
        </div>
      )}

      {/* Fetch keywords button */}
      <button
        disabled={totalKeywords === 0 || totalKeywords > MAX_KEYWORDS_ALLOWED}
        className={styles.fetchKeywordsButton}
        onClick={() => console.log('Fetch keywords')}
      >
        Fetch keywords
      </button>
    </section>
  );
};

export default DatabaseKeywordList;

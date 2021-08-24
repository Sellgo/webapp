import React, { useState, useEffect, useCallback } from 'react';
import { Icon, TextArea } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

/* Styling */
import styles from './index.module.scss';

/* Componensts */
import InputFilter from '../../../../components/FormFilters/InputFilter';

/* Constants */
import { MAX_KEYWORDS_ALLOWED } from '../../../../constants/KeywordResearch/KeywordDatabase';

/* Selectors */
import { getKeywordDatabaseKeywordList } from '../../../../selectors/KeywordResearch/KeywordDatabase';

/* Actions */
import {
  askForKeywordSuggestion,
  fetchKeywordDatabaseRequestId,
} from '../../../../actions/KeywordResearch/KeywordDatabase';

interface Props {
  keywordDatabaseKeywordList: string;
  fetchKeywordDatabaseRequestId: (payload: string) => void;
}

const DatabaseKeywordList = (props: Props) => {
  const { keywordDatabaseKeywordList, fetchKeywordDatabaseRequestId } = props;

  const [keywords, setKeywords] = useState<string>('');
  const [isTextArea, setIsTextArea] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState([]);

  const totalKeywords = keywords
    ? keywords.split(',').filter(keyword => keyword.trim().length > 0).length
    : 0;

  /* Load all keywords from state */
  useEffect(() => {
    setKeywords(keywordDatabaseKeywordList);
  }, []);

  /* Handle fetch keywords */
  const handleSubmit = () => {
    fetchKeywordDatabaseRequestId(keywords);
  };

  /* Handle on suggestion click */
  const handleSuggestionClick = (e: any) => {
    e.preventDefault();
    const selectedSuggestion = e.target.textContent;
    setKeywords(prevState => {
      const keywordsArray = prevState.split(',');
      const removeEmptyKeywords = keywordsArray.filter(keyword => keyword.length > 0) || [];
      if (removeEmptyKeywords.length === 1) {
        return `${selectedSuggestion}`;
      }

      removeEmptyKeywords[removeEmptyKeywords.length - 1] = selectedSuggestion;
      return `${removeEmptyKeywords.join(',')}`;
    });
    setSuggestions([]);
  };

  /* Always get suggestion for last word entered */
  const getSuggestions = useCallback(
    debounce(async (keywords: string) => {
      const data = await askForKeywordSuggestion(keywords);
      setSuggestions(data);
    }, 500),
    []
  );

  /* Handle keyword Change */
  const handleKeywordsChange = (value: string) => {
    // set current keyword and ask for suggestion
    setKeywords(value);
    getSuggestions(value);
  };

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
            handleChange={handleKeywordsChange}
            className={styles.longInput}
          />
          {suggestions.length > 0 && (
            <ul className={styles.keywordSuggestions} onClick={handleSuggestionClick}>
              {suggestions.map((suggestion: any) => {
                return <li key={suggestion.search_term}>{suggestion.search_term}</li>;
              })}
            </ul>
          )}
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
        onClick={handleSubmit}
      >
        Fetch keywords
      </button>
    </section>
  );
};

const mapStateToProps = (state: any) => {
  return {
    keywordDatabaseKeywordList: getKeywordDatabaseKeywordList(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchKeywordDatabaseRequestId: (payload: string) =>
      dispatch(fetchKeywordDatabaseRequestId(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DatabaseKeywordList);

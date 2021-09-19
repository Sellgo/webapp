import React, { useState, useEffect, useCallback } from 'react';
import { TextArea } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

/* Styling */
import styles from './index.module.scss';

/* Componensts */
import InputFilter from '../../../../components/FormFilters/InputFilter';

/* Constants */
import { MAX_KEYWORDS_ALLOWED } from '../../../../constants/KeywordResearch/KeywordDatabase';

/* Selectors */
import {
  getKeywordDatabaseKeywordList,
  getKeywordDatabaseRequestId,
} from '../../../../selectors/KeywordResearch/KeywordDatabase';

/* Actions */
import {
  askForKeywordSuggestion,
  fetchKeywordDatabaseRequestId,
} from '../../../../actions/KeywordResearch/KeywordDatabase';

/* Assets */
import { ReactComponent as ChevronRight } from '../../../../assets/images/chevronRight.svg';
import { ReactComponent as ChevronDown } from '../../../../assets/images/chevronDown.svg';

interface Props {
  keywordDatabaseKeywordList: string;
  keywordDatabaseRequestId: string;
  fetchKeywordDatabaseRequestId: (payload: string) => void;
}

const DatabaseKeywordList = (props: Props) => {
  const {
    keywordDatabaseKeywordList,
    keywordDatabaseRequestId,
    fetchKeywordDatabaseRequestId,
  } = props;

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
    setSuggestions([]);
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
      setSuggestions(data || []);
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
      {/* Toggle Icon  */}
      {isTextArea ? (
        <ChevronDown
          className={styles.toggleChevronDown}
          onClick={() => setIsTextArea(prevState => !prevState)}
        />
      ) : (
        <ChevronRight
          className={styles.toggleChevronRight}
          onClick={() => setIsTextArea(prevState => !prevState)}
        />
      )}

      {/* Input type wih auto suggestions */}
      {!isTextArea && (
        <div className={styles.commaSeperatedInput}>
          {/* Togle Icons */}
          <InputFilter
            placeholder="Enter keyword seperated by comma"
            value={keywords}
            handleChange={handleKeywordsChange}
            className={styles.longInput}
            label="Add Keywords"
          />
          {suggestions.length > 0 && (
            <ul className={styles.keywordSuggestions} onClick={handleSuggestionClick}>
              {suggestions.map((suggestion: any, index: number) => {
                return <li key={suggestion.search_term + index}>{suggestion.search_term}</li>;
              })}
            </ul>
          )}
        </div>
      )}

      {/* Text Area  */}
      {isTextArea && (
        <div className={styles.newLineSeperatedInput}>
          <TextArea
            placeholder="Enter upto 200 keywords (1 per line) ..."
            className={styles.textInput}
            value={keywords
              .split(',')
              .map(k => k.trim())
              .join('\n')}
            onChange={(e: any, { value }: any) => setKeywords(value.split('\n').join(','))}
          />
        </div>
      )}

      {/* Fetch keywords button */}
      <button
        disabled={totalKeywords === 0 || totalKeywords > MAX_KEYWORDS_ALLOWED}
        className={
          keywordDatabaseRequestId ? styles.fetchKeywordsActive : styles.fetchKeywordsInActive
        }
        onClick={handleSubmit}
      >
        Search
      </button>
    </section>
  );
};

const mapStateToProps = (state: any) => {
  return {
    keywordDatabaseKeywordList: getKeywordDatabaseKeywordList(state),
    keywordDatabaseRequestId: getKeywordDatabaseRequestId(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchKeywordDatabaseRequestId: (payload: string) =>
      dispatch(fetchKeywordDatabaseRequestId(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DatabaseKeywordList);

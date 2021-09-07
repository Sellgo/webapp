import React, { useState } from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Actions */
import {
  fetchKeywordReverseRequestId,
  setAsinListForKeywordReverse,
} from '../../../../actions/KeywordResearch/KeywordReverse';

/* Constansts */
import { isValidAsin } from '../../../../constants';
import { MAX_ASINS_ALLOWED } from '../../../../constants/KeywordResearch/KeywordReverse';

/* Selectors */
import { getKeywordReverseAsinList } from '../../../../selectors/KeywordResearch/KeywordReverse';

/* Assets */
import { ReactComponent as CrossRemoveIcon } from '../../../../assets/images/crossRemoveIcon.svg';

interface Props {
  keywordReverseAsinList: string;
  setKeywordReverseAsinList: (payload: string) => void;
  fetchKeywordReverseRequestId: (payload: string) => void;
}

const ReverseAsinsList = (props: Props) => {
  const { keywordReverseAsinList, setKeywordReverseAsinList, fetchKeywordReverseRequestId } = props;

  const [toAddAsins, setToAddAsins] = useState('');

  /* Add new asins to list */
  const handleAddNewAsins = (e: any) => {
    const { value } = e.target;

    if (value.includes(',')) {
      const [asin] = value.split(',');
      // dispatch and add to redux store
      setKeywordReverseAsinList(
        `${keywordReverseAsinList ? keywordReverseAsinList + ',' : ''}${asin}`
      );
      setToAddAsins('');
    } else {
      setToAddAsins(value);
    }
  };

  /* Remove the asins from list */
  const removeAsinFromList = (asinToRemove: string) => {
    const filteredAsinList = keywordReverseAsinList
      .split(',')
      .filter(asin => asin !== asinToRemove);

    setKeywordReverseAsinList(filteredAsinList.join(','));
  };

  // asin List from redux store (last asins)
  const asinList = keywordReverseAsinList.length > 0 ? keywordReverseAsinList.split(',') : [];

  // check if all asins are valid
  const areAllAsinsValid = asinList.every((asin: string) => isValidAsin(asin));

  return (
    <section className={styles.asinListMapper}>
      {/* Asin list items display + input */}
      <div className={styles.asinList}>
        {asinList.map((asin: string) => {
          const isValid = isValidAsin(asin);
          return (
            <div key={asin} className={`${isValid ? styles.asinPill : styles.asinPillInvalid}`}>
              {asin}
              <span className={styles.removeAsin} onClick={() => removeAsinFromList(asin)}>
                <CrossRemoveIcon />
              </span>
            </div>
          );
        })}
        <input
          type="text"
          className={styles.asinInput}
          placeholder="Enter asins spearted by comma"
          value={toAddAsins.toUpperCase()}
          onChange={handleAddNewAsins}
          disabled={asinList.length === MAX_ASINS_ALLOWED}
        />
        <span className={styles.infoDetail}>
          {MAX_ASINS_ALLOWED - asinList.length} more ASINs allowed.
        </span>
      </div>

      {/* Fetch keywords button */}
      <button
        disabled={!areAllAsinsValid || asinList.length === 0 || asinList.length > MAX_ASINS_ALLOWED}
        className={styles.fetchKeywordsButton}
        onClick={() => fetchKeywordReverseRequestId(keywordReverseAsinList)}
      >
        Fetch keywords
      </button>
    </section>
  );
};

const mapStateToProps = (state: any) => {
  return {
    keywordReverseAsinList: getKeywordReverseAsinList(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setKeywordReverseAsinList: (payload: string) => dispatch(setAsinListForKeywordReverse(payload)),
    fetchKeywordReverseRequestId: (payload: string) =>
      dispatch(fetchKeywordReverseRequestId(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReverseAsinsList);

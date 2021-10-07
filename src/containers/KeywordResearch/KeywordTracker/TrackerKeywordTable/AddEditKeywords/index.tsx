import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Selectors */
import {
  getKeywordTrackerProductsExpandedRow,
  getTrackerProductKeywordsTablePaginationInfo,
  getTrackerProductKeywordsTableResults,
} from '../../../../../selectors/KeywordResearch/KeywordTracker';

/* Actions */
import {
  addTrackerProductKeywords,
  unTrackTrackerProductTableKeyword,
} from '../../../../../actions/KeywordResearch/KeywordTracker';

/* Components*/
import AddProductKeywordModal from '../../../../../components/AddProductKeywordModal';

/* Assets */
import { ReactComponent as ThinAddIcon } from '../../../../../assets/images/thinAddIcon.svg';

/* Interfaces */
import {
  AddTrackerProductKeyword,
  TrackerProductKeywordsTablePaginationInfo,
  UnTrackProductsTableKeyword,
} from '../../../../../interfaces/KeywordResearch/KeywordTracker';
import {
  TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY,
  TRACKER_PRODUCT_KEYWORDS_TABLE_UNIQUE_ROW_KEY,
} from '../../../../../constants/KeywordResearch/KeywordTracker';

interface Props {
  keywordTrackerTableExpandedRow: any;
  trackerProductKeywordsTablePaginationInfo: TrackerProductKeywordsTablePaginationInfo;
  trackerProductKeywordsTableResults: any[];
  unTrackTrackerProductTableKeyword: (payload: UnTrackProductsTableKeyword) => void;
  addTrackerProductKeywords: (payload: AddTrackerProductKeyword) => void;
}

const AddEditKeywords = (props: Props) => {
  const {
    keywordTrackerTableExpandedRow,
    trackerProductKeywordsTablePaginationInfo,
    addTrackerProductKeywords,
    unTrackTrackerProductTableKeyword,
    trackerProductKeywordsTableResults,
  } = props;
  console.log(trackerProductKeywordsTableResults);

  const currentKeywords = trackerProductKeywordsTableResults.map((keyword: any) => keyword.phrase);
  const [addEditKeywords, setAddEditKeywords] = useState(false);

  /* Handle add more keywords to product here */
  const handleAddKeywords = (payload: any) => {
    const newKeywords: string[] = payload.keywords.split(',');

    /* Extract newly added keywords */
    const addedKeywords = newKeywords.filter(
      (keyword: string) => !currentKeywords.includes(keyword)
    );

    const addKeywordsPayload = {
      keywords: addedKeywords.join(','),
      keywordTrackProductId: keywordTrackerTableExpandedRow[TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY],
    };
    addTrackerProductKeywords(addKeywordsPayload);

    /* Delete old keywords */
    const deletedKeywords = trackerProductKeywordsTableResults.filter(
      (keyword: any) => !newKeywords.includes(keyword.phrase)
    );
    deletedKeywords.map((keyword: any) => {
      unTrackTrackerProductTableKeyword({
        keywordTrackId: keyword[TRACKER_PRODUCT_KEYWORDS_TABLE_UNIQUE_ROW_KEY],
      });
      return keyword[TRACKER_PRODUCT_KEYWORDS_TABLE_UNIQUE_ROW_KEY];
    });
  };

  return (
    <div className={styles.addEditKeywordsWrapper}>
      <button className={styles.addEditKeywords} onClick={() => setAddEditKeywords(true)}>
        <ThinAddIcon />
        Add Keywords
      </button>

      {/* Add Products Modal */}
      <Modal
        open={addEditKeywords}
        className={styles.addEditKeywordsModal}
        onClose={() => setAddEditKeywords(false)}
        content={
          <AddProductKeywordModal
            parentAsin={keywordTrackerTableExpandedRow.asin}
            currentKeywords={currentKeywords}
            currentKeywordsCount={trackerProductKeywordsTablePaginationInfo.count}
            onSubmit={handleAddKeywords}
            closeModal={() => setAddEditKeywords(false)}
            productDetails={{
              image: keywordTrackerTableExpandedRow.image_url,
              title: keywordTrackerTableExpandedRow.title,
            }}
          />
        }
      />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    keywordTrackerTableExpandedRow: getKeywordTrackerProductsExpandedRow(state),
    trackerProductKeywordsTablePaginationInfo: getTrackerProductKeywordsTablePaginationInfo(state),
    trackerProductKeywordsTableResults: getTrackerProductKeywordsTableResults(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    unTrackTrackerProductTableKeyword: (payload: UnTrackProductsTableKeyword) =>
      dispatch(unTrackTrackerProductTableKeyword(payload)),
    addTrackerProductKeywords: (payload: AddTrackerProductKeyword) =>
      dispatch(addTrackerProductKeywords(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditKeywords);

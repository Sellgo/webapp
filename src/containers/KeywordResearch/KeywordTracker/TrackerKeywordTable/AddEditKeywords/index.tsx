import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Selectors */
import {
  getKeywordTrackerProductsExpandedRow,
  getIsLoadingTrackerProductKeywordsTable,
  getTrackerProductKeywordsTableResults,
} from '../../../../../selectors/KeywordResearch/KeywordTracker';

/* Actions */
import { addTrackerProductKeywords } from '../../../../../actions/KeywordResearch/KeywordTracker';

/* Components*/
import AddProductKeywordModal from '../../../../../components/AddProductKeywordModal';
import ActionButton from '../../../../../components/ActionButton';

/* Constants */
import { TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY } from '../../../../../constants/KeywordResearch/KeywordTracker';

/* Assets */
import { ReactComponent as ThinAddIcon } from '../../../../../assets/images/thinAddIcon.svg';

/* Interfaces */
import { AddTrackerProductKeyword } from '../../../../../interfaces/KeywordResearch/KeywordTracker';

interface Props {
  keywordTrackerTableExpandedRow: any;
  trackerProductKeywordsTableResults: any[];
  isLoadingTrackerProductKeywordsTable: boolean;
  addTrackerProductKeywords: (payload: AddTrackerProductKeyword) => void;
}

const AddEditKeywords = (props: Props) => {
  const {
    keywordTrackerTableExpandedRow,
    trackerProductKeywordsTableResults,
    addTrackerProductKeywords,
    isLoadingTrackerProductKeywordsTable,
  } = props;

  const [addEditKeywords, setAddEditKeywords] = useState(false);

  /* Handle add more keywords to product here */
  const handleAddEditKeywords = (payload: any) => {
    const { keywords } = payload;

    const sendPayload = {
      keywords,
      keywordTrackProductId: keywordTrackerTableExpandedRow[TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY],
    };

    addTrackerProductKeywords(sendPayload);
  };

  const currentKeywordsList =
    trackerProductKeywordsTableResults &&
    trackerProductKeywordsTableResults.map((k: any) => k.phrase).join('\n');

  return (
    <div className={styles.addEditKeywordsWrapper}>
      <ActionButton
        type="orange"
        variant="secondary"
        size="md"
        className={styles.addEditKeywords}
        onClick={() => setAddEditKeywords(true)}
        disabled={isLoadingTrackerProductKeywordsTable}
      >
        <ThinAddIcon />
        Add/Edit Keywords
      </ActionButton>

      {/* Add Products Modal */}
      <Modal
        open={addEditKeywords}
        className={styles.addEditKeywordsModal}
        onClose={() => setAddEditKeywords(false)}
        content={
          <AddProductKeywordModal
            currentKeywordsList={currentKeywordsList}
            parentAsin={keywordTrackerTableExpandedRow.asin}
            onSubmit={handleAddEditKeywords}
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
    trackerProductKeywordsTableResults: getTrackerProductKeywordsTableResults(state),
    isLoadingTrackerProductKeywordsTable: getIsLoadingTrackerProductKeywordsTable(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addTrackerProductKeywords: (payload: AddTrackerProductKeyword) =>
      dispatch(addTrackerProductKeywords(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditKeywords);

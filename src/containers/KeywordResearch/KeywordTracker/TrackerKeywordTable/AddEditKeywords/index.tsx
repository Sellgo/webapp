import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Selectors */
import {
  getKeywordTrackerProductsExpandedRow,
  getTrackerProductKeywordsTablePaginationInfo,
} from '../../../../../selectors/KeywordResearch/KeywordTracker';

/* Actions */
import { addTrackerProductKeywords } from '../../../../../actions/KeywordResearch/KeywordTracker';

/* Components*/
import AddProductKeywordModal from '../../../../../components/AddProductKeywordModal';
import ActionButton from '../../../../../components/ActionButton';

/* Assets */
import { ReactComponent as ThinAddIcon } from '../../../../../assets/images/thinAddIcon.svg';

/* Interfaces */
import {
  AddTrackerProductKeyword,
  TrackerProductKeywordsTablePaginationInfo,
} from '../../../../../interfaces/KeywordResearch/KeywordTracker';
import { TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY } from '../../../../../constants/KeywordResearch/KeywordTracker';

interface Props {
  keywordTrackerTableExpandedRow: any;
  trackerProductKeywordsTablePaginationInfo: TrackerProductKeywordsTablePaginationInfo;
  addTrackerProductKeywords: (payload: AddTrackerProductKeyword) => void;
}

const AddEditKeywords = (props: Props) => {
  const {
    keywordTrackerTableExpandedRow,
    trackerProductKeywordsTablePaginationInfo,
    addTrackerProductKeywords,
  } = props;

  const [addEditKeywords, setAddEditKeywords] = useState(false);

  /* Handle add more keywords to product here */
  const handleAddKeywords = (payload: any) => {
    const { keywords } = payload;

    const sendPayload = {
      keywords,
      keywordTrackProductId: keywordTrackerTableExpandedRow[TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY],
    };

    addTrackerProductKeywords(sendPayload);
  };

  return (
    <div className={styles.addEditKeywordsWrapper}>
      <ActionButton
        type="orange"
        variant="secondary"
        size="md"
        className={styles.addEditKeywords}
        onClick={() => setAddEditKeywords(true)}
      >
        <ThinAddIcon />
        Add Keywords
      </ActionButton>

      {/* Add Products Modal */}
      <Modal
        open={addEditKeywords}
        className={styles.addEditKeywordsModal}
        onClose={() => setAddEditKeywords(false)}
        content={
          <AddProductKeywordModal
            parentAsin={keywordTrackerTableExpandedRow.asin}
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
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addTrackerProductKeywords: (payload: AddTrackerProductKeyword) =>
      dispatch(addTrackerProductKeywords(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditKeywords);

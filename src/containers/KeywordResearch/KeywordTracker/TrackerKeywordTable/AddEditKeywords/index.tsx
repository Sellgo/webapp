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

/* <Components*/
import AddProductKeywordModal from '../../../../../components/AddProductKeywordModal';

/* Assets */
import { ReactComponent as ThinAddIcon } from '../../../../../assets/images/thinAddIcon.svg';
import { TrackerProductKeywordsTablePaginationInfo } from '../../../../../interfaces/KeywordResearch/KeywordTracker';

interface Props {
  keywordTrackerTableExpandedRow: any;
  trackerProductKeywordsTablePaginationInfo: TrackerProductKeywordsTablePaginationInfo;
}

const AddEditKeywords = (props: Props) => {
  const { keywordTrackerTableExpandedRow, trackerProductKeywordsTablePaginationInfo } = props;

  const [addEditKeywords, setAddEditKeywords] = useState(false);

  const handleAddKeywords = (payload: any) => {
    console.log(payload);
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
            currentKeywordsCount={trackerProductKeywordsTablePaginationInfo.count}
            onSubmit={handleAddKeywords}
            closeModal={() => setAddEditKeywords(false)}
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

export default connect(mapStateToProps)(AddEditKeywords);

import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Constants */
import {
  MAX_COMPETITORS_ALLOWED,
  TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY,
} from '../../constants/KeywordResearch/KeywordTracker';

/* Utils */
import { truncateString } from '../../utils/format';
import { timeout } from '../../utils/timeout';

/* Selectors */
import { getKeywordTrackerProductsExpandedRow } from '../../selectors/KeywordResearch/KeywordTracker';

/* Actions */
import { addCompetitorsToKeywordTrackerProductsTable } from '../../actions/KeywordResearch/KeywordTracker';

/* Components */
import BulkAsinAdder from '../BulkAsinAdder';

/* Assets */
import placeholderImage from '../../assets/images/placeholderImage.svg';

/* Interfaces */
import { AddCompetitorsPayload } from '../../interfaces/KeywordResearch/KeywordTracker';

interface Props {
  keywordTrackerProductsExpandedRow: any;
  addCompetitorsToKeywordTrackerProductsTable: (payload: AddCompetitorsPayload) => void;
  closeModal: () => void;
}

const AddCompetitorsModal = (props: Props) => {
  const {
    keywordTrackerProductsExpandedRow,
    closeModal,
    addCompetitorsToKeywordTrackerProductsTable,
  } = props;

  const { image, title, asin, competitors } = keywordTrackerProductsExpandedRow;
  const keywordTrackProductId =
    keywordTrackerProductsExpandedRow[TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY];

  const competitorsAsins = competitors.map((a: any) => a.asin).join(',');

  // On submit
  const handleSubmit = async (payload: any) => {
    const { asins } = payload;

    addCompetitorsToKeywordTrackerProductsTable({
      keywordTrackProductId,
      asins,
    });
    await timeout(1000);
    closeModal();
  };

  return (
    <div className={styles.addCompetitorModal}>
      {/* Meta info for tye modal */}
      <div className={styles.metaData}>
        <h1>ADD COMPETITORS</h1>
      </div>

      {/* Produict Details */}
      <div className={styles.productDetails}>
        <div className={styles.productImage}>
          <img src={image ? image : placeholderImage} alt={title} />
        </div>

        <div className={styles.productInfo}>
          <h3>{truncateString(title, 110)}</h3>
          <div className={styles.marketplaceInfo}>
            <img src={require(`../../assets/flags/US.png`)} alt="American Flag" />
            <span>{asin}</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '30px' }} />

      <BulkAsinAdder
        label="Add Competitor ASINs"
        maxAsinsAllowed={MAX_COMPETITORS_ALLOWED}
        currentAsins={competitorsAsins}
        onSubmit={handleSubmit}
        submitLabel="Track"
        hideReset={false}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    keywordTrackerProductsExpandedRow: getKeywordTrackerProductsExpandedRow(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addCompetitorsToKeywordTrackerProductsTable: (payload: AddCompetitorsPayload) =>
      dispatch(addCompetitorsToKeywordTrackerProductsTable(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCompetitorsModal);

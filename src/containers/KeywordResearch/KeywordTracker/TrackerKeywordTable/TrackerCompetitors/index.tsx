import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Constants */
import { MAX_COMPETITORS_ALLOWED } from '../../../../../constants/KeywordResearch/KeywordTracker';

/* Components */
import TrackerCompetitorDetails from '../../../../../components/TrackerCompetitorDetails';
import AddCompetitorsModal from '../../../../../components/AddCompetitorModal';

/* Selectors */
import { getKeywordTrackerProductsExpandedRow } from '../../../../../selectors/KeywordResearch/KeywordTracker';

/* Actions */
import {
  addCompetitorsToKeywordTrackerProductsTable,
  removeCompetitorFromKeywordTrackerProductsTable,
} from '../../../../../actions/KeywordResearch/KeywordTracker';

/* Interfaces */
import {
  AddCompetitorsPayload,
  KeywordTrackerTableCompetitors,
  RemoveCompetitorPayload,
} from '../../../../../interfaces/KeywordResearch/KeywordTracker';

/* Assets */
import { ReactComponent as AddCirecleIcon } from '../../../../../assets/images/addAsinPlusIcon.svg';

interface Props {
  keywordTrackerProductsExpandedRow: any;
  addCompetitorsToKeywordTrackerProductsTable: (payload: AddCompetitorsPayload) => void;
  removeCompetitorFromKeywordTrackerProductsTable: (payload: RemoveCompetitorPayload) => void;
}

const TrackerCompetitors = (props: Props) => {
  const {
    keywordTrackerProductsExpandedRow,
    addCompetitorsToKeywordTrackerProductsTable,
    removeCompetitorFromKeywordTrackerProductsTable,
  } = props;

  const [addCompetitors, setAddCompetitors] = useState(false);

  // Total length of the competitors
  const expandedRowCompetitors = keywordTrackerProductsExpandedRow.competitors || [];
  const totalCurrentCompetitors = expandedRowCompetitors.length;

  // Remove the competitor from the product */
  const handleRemoveCompetitor = (payload: RemoveCompetitorPayload) => {
    removeCompetitorFromKeywordTrackerProductsTable(payload);
  };

  // Add Competitors ASIN's on the product
  const handleAddCompetitors = (payload: AddCompetitorsPayload) => {
    addCompetitorsToKeywordTrackerProductsTable(payload);
  };

  return (
    <>
      <section className={styles.competitorsSection}>
        {/* Competitors Count */}
        <div className={styles.totalCompetitors}>
          <p>Competitors:</p>
          <span>
            {totalCurrentCompetitors} / {MAX_COMPETITORS_ALLOWED}
          </span>
        </div>

        {/* Competitors Display  */}
        <div className={styles.competitorsAsinsWrapper}>
          {expandedRowCompetitors.map((d: KeywordTrackerTableCompetitors) => {
            return (
              <TrackerCompetitorDetails
                data={d}
                key={uuid()}
                removeCompetitor={handleRemoveCompetitor}
              />
            );
          })}
        </div>

        <button
          className={styles.addCompetitor}
          onClick={() => setAddCompetitors(true)}
          disabled={totalCurrentCompetitors >= MAX_COMPETITORS_ALLOWED}
        >
          <AddCirecleIcon />
          <span>Add Competitor's ASIN</span>
        </button>
      </section>

      {/* Add Competitors Modal */}
      <Modal
        open={addCompetitors}
        className={styles.addCompetitorsModal}
        onClose={() => setAddCompetitors(false)}
        content={
          <AddCompetitorsModal
            currentCompetitorsCount={totalCurrentCompetitors}
            onSubmit={handleAddCompetitors}
            parentAsin={keywordTrackerProductsExpandedRow.asin}
            keywordTrackProductId={keywordTrackerProductsExpandedRow.keyword_track_product_id}
          />
        }
      />
    </>
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
    removeCompetitorFromKeywordTrackerProductsTable: (payload: RemoveCompetitorPayload) =>
      dispatch(removeCompetitorFromKeywordTrackerProductsTable(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackerCompetitors);

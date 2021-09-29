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
import { timeout } from '../../../../../utils/timeout';

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

  const [addCompetitorsModal, setAddCompetitorsModal] = useState(false);

  // Total length of the competitors
  const expandedRowCompetitors = keywordTrackerProductsExpandedRow.competitors || [];
  const totalCurrentCompetitors = expandedRowCompetitors.length;

  // Remove the competitor from the product */
  const handleRemoveCompetitor = (payload: RemoveCompetitorPayload) => {
    removeCompetitorFromKeywordTrackerProductsTable(payload);
  };

  // Add Competitors ASIN's on the product
  const handleAddCompetitors = async (payload: AddCompetitorsPayload) => {
    addCompetitorsToKeywordTrackerProductsTable(payload);
    await timeout(1000);
    setAddCompetitorsModal(false);
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

        <button
          className={styles.addCompetitor}
          onClick={() => setAddCompetitorsModal(true)}
          disabled={totalCurrentCompetitors >= MAX_COMPETITORS_ALLOWED}
        >
          <AddCirecleIcon />
          <span>Add ASINs</span>
        </button>

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
      </section>

      {/* Add Competitors Modal */}
      <Modal
        open={addCompetitorsModal}
        className={styles.addCompetitorsModal}
        onClose={() => setAddCompetitorsModal(false)}
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

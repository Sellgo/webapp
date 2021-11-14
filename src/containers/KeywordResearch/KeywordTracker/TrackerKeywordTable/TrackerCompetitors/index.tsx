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
import ActionButton from '../../../../../components/ActionButton';

/* Selectors */
import { getKeywordTrackerProductsExpandedRow } from '../../../../../selectors/KeywordResearch/KeywordTracker';

/* Actions */
import { removeCompetitorFromKeywordTrackerProductsTable } from '../../../../../actions/KeywordResearch/KeywordTracker';

/* Interfaces */
import {
  KeywordTrackerTableCompetitors,
  RemoveCompetitorPayload,
} from '../../../../../interfaces/KeywordResearch/KeywordTracker';

/* Assets */
import { ReactComponent as ThinAddIcon } from '../../../../../assets/images/thinAddIcon.svg';

interface Props {
  keywordTrackerProductsExpandedRow: any;
  removeCompetitorFromKeywordTrackerProductsTable: (payload: RemoveCompetitorPayload) => void;
}

const TrackerCompetitors = (props: Props) => {
  const {
    keywordTrackerProductsExpandedRow,

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

        <ActionButton
          type="purpleGradient"
          variant="secondary"
          size="md"
          className={styles.addCompetitor}
          onClick={() => setAddCompetitorsModal(true)}
          disabled={totalCurrentCompetitors >= MAX_COMPETITORS_ALLOWED}
        >
          <ThinAddIcon />
          <span>Add ASINs</span>
        </ActionButton>

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
            closeModal={() => {
              setAddCompetitorsModal(false);
            }}
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
    removeCompetitorFromKeywordTrackerProductsTable: (payload: RemoveCompetitorPayload) =>
      dispatch(removeCompetitorFromKeywordTrackerProductsTable(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackerCompetitors);

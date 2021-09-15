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
import { getKeywordTrackerProductsTableCompetitors } from '../../../../../selectors/KeywordResearch/KeywordTracker';

/* Actions */
import { removeCompetitorFromKeywordTrackerProductsTable } from '../../../../../actions/KeywordResearch/KeywordTracker';

/* Interfaces */
import {
  KeywordTrackerTableCompetitors,
  RemoveCompetitorPayload,
} from '../../../../../interfaces/KeywordResearch/KeywordTracker';

/* Assets */
import { ReactComponent as AddCirecleIcon } from '../../../../../assets/images/addAsinPlusIcon.svg';

interface Props {
  keywordTrackerProductsTableCompetitors: KeywordTrackerTableCompetitors[];
  removeCompetitorFromKeywordTrackerProductsTable: (payload: RemoveCompetitorPayload) => void;
}

const TrackerCompetitors = (props: Props) => {
  const {
    keywordTrackerProductsTableCompetitors,
    removeCompetitorFromKeywordTrackerProductsTable,
  } = props;

  const [addCompetitors, setAddCompetitors] = useState(false);

  // Total length of the competitors
  const totalCurrentCompetitors = keywordTrackerProductsTableCompetitors.length;

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

        {/* Competitors Display  */}
        <div className={styles.competitorsAsinsWrapper}>
          {keywordTrackerProductsTableCompetitors.map(d => {
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
            onSubmit={() => {
              console.log('Submitted');
            }}
          />
        }
      />
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    keywordTrackerProductsTableCompetitors: getKeywordTrackerProductsTableCompetitors(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    removeCompetitorFromKeywordTrackerProductsTable: (payload: RemoveCompetitorPayload) =>
      dispatch(removeCompetitorFromKeywordTrackerProductsTable(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackerCompetitors);

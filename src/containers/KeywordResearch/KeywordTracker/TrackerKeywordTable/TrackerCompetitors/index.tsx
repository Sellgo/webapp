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

/* Interfaces */
import { KeywordTrackerTableCompetitors } from '../../../../../interfaces/KeywordResearch/KeywordTracker';

/* Assets */
import { ReactComponent as AddCirecleIcon } from '../../../../../assets/images/addAsinPlusIcon.svg';

const fakeData = [
  { asin: 'B07YKPJJYN' },
  { asin: 'B08HRJ3V5B' },
  { asin: 'B091MNZSBM' },
  { asin: 'B0899J7918' },
  { asin: 'B0899J7918' },
];

const currentCompetitorsCount = fakeData.length;

interface Props {
  keywordTrackerProductsTableCompetitors: KeywordTrackerTableCompetitors[];
}

const TrackerCompetitors = (props: Props) => {
  const { keywordTrackerProductsTableCompetitors } = props;

  const [addCompetitors, setAddCompetitors] = useState(false);

  const totalCurrentCompetitors = keywordTrackerProductsTableCompetitors.length;

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
            return <TrackerCompetitorDetails data={d} key={uuid()} />;
          })}
        </div>

        <button
          className={styles.addCompetitor}
          onClick={() => setAddCompetitors(true)}
          disabled={fakeData.length >= MAX_COMPETITORS_ALLOWED}
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
            currentCompetitorsCount={currentCompetitorsCount}
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

export default connect(mapStateToProps)(TrackerCompetitors);

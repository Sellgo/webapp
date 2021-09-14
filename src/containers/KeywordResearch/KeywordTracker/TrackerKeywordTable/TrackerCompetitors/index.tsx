import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Modal } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Constants */
import { MAX_COMPETITORS_ALLOWED } from '../../../../../constants/KeywordResearch/KeywordTracker';

/* Components */
import TrackerCompetitorDetails from '../../../../../components/TrackerCompetitorDetails';
import AddCompetitorsModal from '../../../../../components/AddCompetitorModal';

/* Assets */
import { ReactComponent as AddCirecleIcon } from '../../../../../assets/images/addAsinPlusIcon.svg';

const fakeData = [
  { asin: 'B07YKPJJYN' },
  { asin: 'B08HRJ3V5B' },
  { asin: 'B091MNZSBM' },
  { asin: 'B0899J7918' },
  { asin: 'B0899J7918' },
];

const TrackerCompetitors = () => {
  const [addCompetitors, setAddCompetitors] = useState(false);
  return (
    <>
      <section className={styles.competitorsSection}>
        <div className={styles.totalCompetitors}>
          <p>Competitors:</p>
          <span>
            {fakeData.length} / {MAX_COMPETITORS_ALLOWED}
          </span>
        </div>

        <div className={styles.competitorsAsinsWrapper}>
          {fakeData.map(d => {
            return <TrackerCompetitorDetails asin={d.asin} key={uuid()} />;
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

      <Modal
        open={addCompetitors}
        className={styles.addCompetitorsModal}
        onClose={() => setAddCompetitors(false)}
        content={<AddCompetitorsModal />}
      />
    </>
  );
};

export default TrackerCompetitors;

import React from 'react';
import { v4 as uuid } from 'uuid';

/* Styling */
import styles from './index.module.scss';

/* Constants */
import { MAX_COMPETITORS_ALLOWED } from '../../../../../constants/KeywordResearch/KeywordTracker';
import TrackerCompetitorDetails from '../../../../../components/TrackerCompetitorDetails';

const fakeData = [
  { asin: 'B07YKPJJYN' },
  { asin: 'B08HRJ3V5B' },
  { asin: 'B091MNZSBM' },
  { asin: 'B0899J7918' },
];

const TrackerCompetitors = () => {
  return (
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
    </section>
  );
};

export default TrackerCompetitors;

import React from 'react';

/* Styling */
import styles from './index.module.scss';

const TrackerCompetitorAsin = () => {
  return (
    <div className={styles.competitorAsin}>
      <img src={require('../../assets/flags/US.png')} alt="US Marketplace flag" />
      <span>B07YKPJJYN</span>
    </div>
  );
};

export default TrackerCompetitorAsin;

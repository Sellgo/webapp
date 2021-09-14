import React from 'react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  asin: string;
}

const TrackerCompetitorDetails = (props: Props) => {
  const { asin } = props;
  return (
    <div className={styles.competitorAsin}>
      <img src={require('../../assets/flags/US.png')} alt="US Marketplace flag" />
      <span>{asin}</span>
    </div>
  );
};

export default TrackerCompetitorDetails;

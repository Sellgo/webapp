import React from 'react';

/* Assets */
import { ReactComponent as HourGlassIcon } from '../../../../../assets/images/hourglassIcon.svg';

/* Styling */
import styles from './index.module.scss';

const LaunchExpensesMeta = () => {
  return (
    <>
      <div className={styles.settingMetaTitle}>
        <HourGlassIcon />
        &nbsp;&nbsp;Product Launch Expenses Settings
      </div>
    </>
  );
};
export default LaunchExpensesMeta;

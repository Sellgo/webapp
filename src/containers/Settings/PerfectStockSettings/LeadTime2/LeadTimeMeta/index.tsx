import React from 'react';

/* Assets */
import { ReactComponent as HourGlassIcon } from '../../../../../assets/images/hourglassIcon.svg';

/* Styling */
import styles from './index.module.scss';

const LeadTimeMeta = () => {
  return (
    <>
      <div className={styles.leadTimeMetaTitle}>
        <HourGlassIcon />
        &nbsp;&nbsp;Lead Time Settings
      </div>
    </>
  );
};
export default LeadTimeMeta;

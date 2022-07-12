import React from 'react';

/* Assets */
import { ReactComponent as HourGlassIcon } from '../../../../../assets/images/hourglassIcon.svg';

/* Styling */
import styles from './index.module.scss';

const DutyTaxMeta = () => {
  return (
    <>
      <div className={styles.leadTimeMetaTitle}>
        <HourGlassIcon />
        &nbsp;&nbsp;Duty Tax Settings
      </div>
    </>
  );
};
export default DutyTaxMeta;

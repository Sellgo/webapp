import React from 'react';

/* Assets */
import { ReactComponent as HourGlassIcon } from '../../../../../assets/images/hourglassIcon.svg';

/* Styling */
import styles from './index.module.scss';

const DaysOfInventoryMeta = () => {
  return (
    <>
      <div className={styles.leadTimeMetaTitle}>
        <HourGlassIcon />
        &nbsp;&nbsp;Days of Inventory Settings
      </div>
    </>
  );
};
export default DaysOfInventoryMeta;

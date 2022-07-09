import React from 'react';

/* Assets */
import { ReactComponent as HourGlassIcon } from '../../../../../assets/images/hourglassIcon.svg';

/* Styling */
import styles from './index.module.scss';

const SkuSettingsMeta = () => {
  return (
    <>
      <div className={styles.leadTimeMetaTitle}>
        <HourGlassIcon />
        &nbsp;&nbsp;SKU Settings
      </div>
    </>
  );
};
export default SkuSettingsMeta;

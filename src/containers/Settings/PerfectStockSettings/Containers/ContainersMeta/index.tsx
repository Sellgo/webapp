import React from 'react';

/* Assets */
import { ReactComponent as SettingIcon } from '../../../../../assets/images/truck-container-solid.svg';

/* Styling */
import styles from './index.module.scss';

const LeadTimeMeta = () => {
  return (
    <>
      <div className={styles.settingMetaTitle}>
        <SettingIcon />
        &nbsp;&nbsp;Shipping Container
      </div>
    </>
  );
};
export default LeadTimeMeta;

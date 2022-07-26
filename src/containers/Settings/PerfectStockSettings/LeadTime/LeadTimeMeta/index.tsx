import React from 'react';

/* Assets */
import { ReactComponent as SettingIcon } from '../../../../../assets/images/calendar-range-solid.svg';

/* Styling */
import styles from './index.module.scss';

const LeadTimeMeta = () => {
  return (
    <>
      <div className={styles.settingMetaTitle}>
        <SettingIcon />
        &nbsp;&nbsp;Lead Time Settings
      </div>
    </>
  );
};
export default LeadTimeMeta;

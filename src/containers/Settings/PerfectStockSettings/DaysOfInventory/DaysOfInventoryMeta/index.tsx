import React from 'react';

/* Assets */
import { ReactComponent as SettingIcon } from '../../../../../assets/images/calendar-range-solid.svg';

/* Styling */
import styles from './index.module.scss';

const DaysOfInventoryMeta = () => {
  return (
    <>
      <div className={styles.settingMetaTitle}>
        <SettingIcon />
        &nbsp;&nbsp;Days of Inventory Settings
      </div>
    </>
  );
};
export default DaysOfInventoryMeta;

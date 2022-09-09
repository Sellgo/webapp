import React from 'react';

/* Assets */
import { ReactComponent as SettingIcon } from '../../../../../assets/images/calendar-range-solid.svg';

/* Styling */
import styles from './index.module.scss';

const SalesForcastingInventoryHistoryMeta = () => {
  return (
    <>
      <div className={styles.settingMetaTitle}>
        <SettingIcon />
        &nbsp;&nbsp;Sales Forecasting - Inventory History
      </div>
    </>
  );
};
export default SalesForcastingInventoryHistoryMeta;

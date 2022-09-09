import React from 'react';

/* Assets */
import { ReactComponent as SettingIcon } from '../../../../../assets/images/file-invoice-dollar-solid.svg';

/* Styling */
import styles from './index.module.scss';

const LaunchExpensesMeta = () => {
  return (
    <>
      <div className={styles.settingMetaTitle}>
        <SettingIcon />
        &nbsp;&nbsp;Product Launch Expenses Settings
      </div>
    </>
  );
};
export default LaunchExpensesMeta;

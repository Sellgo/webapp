import React from 'react';

/* Assets */
import { ReactComponent as SettingIcon } from '../../../../../assets/images/calendar-range-solid.svg';

/* Styling */
import styles from './index.module.scss';

const PaymentTermsMeta = () => {
  return (
    <>
      <div className={styles.settingMetaTitle}>
        <SettingIcon />
        &nbsp;&nbsp;Payment Terms Settings
      </div>
    </>
  );
};
export default PaymentTermsMeta;

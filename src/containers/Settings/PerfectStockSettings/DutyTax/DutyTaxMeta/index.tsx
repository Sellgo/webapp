import React from 'react';

/* Assets */
import { ReactComponent as SettingIcon } from '../../../../../assets/images/file-invoice-dollar-solid.svg';

/* Styling */
import styles from './index.module.scss';

const DutyTaxMeta = () => {
  return (
    <>
      <div className={styles.settingMetaTitle}>
        <SettingIcon />
        &nbsp;&nbsp;Duty Tax Settings
      </div>
    </>
  );
};
export default DutyTaxMeta;

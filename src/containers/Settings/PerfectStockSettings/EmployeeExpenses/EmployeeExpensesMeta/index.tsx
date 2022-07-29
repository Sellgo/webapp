import React from 'react';

/* Assets */
import { ReactComponent as SettingIcon } from '../../../../../assets/images/file-invoice-dollar-solid.svg';

/* Styling */
import styles from './index.module.scss';

const EmployeeExpensesMeta = () => {
  return (
    <>
      <div className={styles.settingMetaTitle}>
        <SettingIcon />
        &nbsp;&nbsp;Employee Expenses Settings
      </div>
    </>
  );
};
export default EmployeeExpensesMeta;

import React from 'react';

/* Assets */
import { ReactComponent as HourGlassIcon } from '../../../../../assets/images/hourglassIcon.svg';

/* Styling */
import styles from './index.module.scss';

const PaymentTermsMeta = () => {
  return (
    <>
      <div className={styles.leadTimeMetaTitle}>
        <HourGlassIcon />
        &nbsp;&nbsp;Payment Terms Settings
      </div>
    </>
  );
};
export default PaymentTermsMeta;

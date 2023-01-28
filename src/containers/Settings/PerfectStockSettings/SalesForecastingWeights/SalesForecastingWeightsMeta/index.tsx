import React from 'react';

/* Assets */
import { ReactComponent as SettingIcon } from '../../../../../assets/images/list-check-solid.svg';

/* Styling */
import styles from './index.module.scss';

const SalesForecastingAdjustorMeta = () => {
  return (
    <>
      <div className={styles.settingMetaTitle}>
        <SettingIcon />
        &nbsp;&nbsp;Sales Forecasting - Seasonality Adjustor
      </div>
    </>
  );
};
export default SalesForecastingAdjustorMeta;

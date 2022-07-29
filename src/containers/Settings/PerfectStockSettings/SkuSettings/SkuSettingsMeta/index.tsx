import React from 'react';

/* Assets */
import { ReactComponent as SettingIcon } from '../../../../../assets/images/list-check-solid.svg';

/* Styling */
import styles from './index.module.scss';

const SkuSettingsMeta = () => {
  return (
    <>
      <div className={styles.settingMetaTitle}>
        <SettingIcon />
        &nbsp;&nbsp;SKU Settings
      </div>
    </>
  );
};
export default SkuSettingsMeta;

import React from 'react';

/* Assets */
import { ReactComponent as SettingIcon } from '../../../../../assets/images/file-check-solid.svg';

/* Styling */
import styles from './index.module.scss';

const RestockLimitMeta = () => {
  return (
    <>
      <div className={styles.settingMetaTitle}>
        <SettingIcon />
        &nbsp;&nbsp;FBA Restock Limit Settings
      </div>
    </>
  );
};

export default RestockLimitMeta;

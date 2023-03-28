import React from 'react';
import { Image } from 'semantic-ui-react';

/* Assets */
import SettingsIcon from '../../../../assets/images/settingsIcon.svg';
/* Styling */
import styles from './index.module.scss';

const BillingMeta = () => {
  return (
    <>
      <div className={styles.settingMetaTitle}>
        <Image src={SettingsIcon} />
        &nbsp;&nbsp;Billing And Usage
      </div>
    </>
  );
};
export default BillingMeta;

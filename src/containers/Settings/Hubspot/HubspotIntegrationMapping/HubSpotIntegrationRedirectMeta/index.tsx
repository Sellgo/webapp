import React from 'react';

/* Assets */
import { ReactComponent as SettingIcon } from '../../../../../assets/images/calendar-range-solid.svg';

/* Styling */
import styles from './index.module.scss';

const HubSpotIntegrationMappingMeta = () => {
  return (
    <>
      <div className={styles.settingMetaTitle}>
        <SettingIcon />
        &nbsp;&nbsp;HubSpot Setup
      </div>
    </>
  );
};
export default HubSpotIntegrationMappingMeta;

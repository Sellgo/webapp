import React from 'react';
import { Image } from 'semantic-ui-react';

/* Assets */
import HubspotLogo from '../../../../../assets/images/hubspot.svg';

/* Styling */
import styles from './index.module.scss';

const HubSpotIntegrationMappingMeta = () => {
  return (
    <>
      <div className={styles.settingMetaTitle}>
        <Image src={HubspotLogo} />
        &nbsp;&nbsp;HubSpot Setup
      </div>
    </>
  );
};
export default HubSpotIntegrationMappingMeta;

/* eslint-disable max-len */
import React, { useState } from 'react';
/* Styles */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../../components/ActionButton';
import { Radio } from 'semantic-ui-react';

/* Constants */

const HubSpotRulesSyncCore = () => {
  const [isOneTimeSync, setIsOneTimeSync] = useState<boolean>(false);
  const handleSave = async () => {
    const url =
      `https://app.hubspot.com/oauth/authorize?` +
      `client_id=a0fb23fb3-6a68-4e4e-86db-1c31bb718977` +
      `&redirect_uri=http://localhost:3000/settings/hs-api-listener` +
      `&scope=crm.objects.contacts.read%20crm.objects.contacts.write%20crm.objects.companies.write%20crm.objects.companies.read`;
    window.open(url, '_blank');
  };

  return (
    <div className={styles.hubspotCore}>
      <div className={styles.hubspotCore__details}>
        <p className={styles.hubspotCore__label}>Sync Rules</p>
        <div className={styles.syncRules__wrapper}>
          <Radio checked={isOneTimeSync} onClick={() => setIsOneTimeSync(true)} />
          <div className={styles.syncRules__descriptionBox}>
            <p>One time sync</p>
            <p>Hubspot will be updated for one time.</p>
          </div>
        </div>
        <div className={styles.syncRules__wrapper}>
          <Radio checked={!isOneTimeSync} onClick={() => setIsOneTimeSync(false)} />
          <div className={styles.syncRules__descriptionBox}>
            <p>Don’t sync now</p>
            <p>Changes to this property in Sellgo will not be detected or updated in Hubspot.</p>
          </div>
        </div>
      </div>
      <ActionButton
        className={styles.applyButton}
        variant="primary"
        type="purpleGradient"
        size="md"
        onClick={handleSave}
        disabled={false}
      >
        Authorize Access Here
      </ActionButton>
    </div>
  );
};

export default HubSpotRulesSyncCore;

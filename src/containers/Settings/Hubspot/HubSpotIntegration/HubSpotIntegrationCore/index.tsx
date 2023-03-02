/* eslint-disable max-len */
import React from 'react';
/* Styles */
import styles from './index.module.scss';

/* Components */
import ActionButton from '../../../../../components/ActionButton';

/* Constants */

const HubSpotIntegrationCore = () => {
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
        <p className={styles.hubspotCore__label}>Hubspot setup is ready to start</p>
        <p className={styles.hubspotCore__description}>
          When the migration is done, your supply chain will be fully automated through a lightning
          speed and robust algorithm, so now you can ensure your fast-selling inventories are always
          in-stock and optimized in quantity.
        </p>
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

export default HubSpotIntegrationCore;

/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Placeholder } from 'semantic-ui-react';

/* Styles */
import styles from './index.module.scss';

/* Selectors */
import { sellerIDSelector } from '../../../../../selectors/Seller';

/* Components */
import ActionButton from '../../../../../components/ActionButton';
import HubSpotIntegrationAuthenticated from './HubSpotIntegrationAuthenticated';

/* Constants */
import { AppConfig } from '../../../../../config';

const HubSpotIntegrationCore = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hubSpotAuthCode, setHubSpotAuthCode] = useState('');
  const getHubspotAuth = async () => {
    setIsLoading(true);
    try {
      const sellerId = sellerIDSelector();
      const res = await axios.get(`${AppConfig.BASE_URL_API}sellers/${sellerId}/hubspot-auth`);
      if (res.status === 200) {
        const { data } = res;
        if (data?.status === 'active') {
          setIsAuthenticated(true);
          setHubSpotAuthCode(`${data?.id}`);
        }
        setIsLoading(false);
      }
    } catch (e) {
      if (e.response && e.response.data) {
        console.log(e.response.data.message);
      }
    }
  };

  useEffect(() => {
    getHubspotAuth();
  }, []);

  const handleSave = async () => {
    const url =
      `https://app.hubspot.com/oauth/authorize?` +
      `client_id=0fb23fb3-6a68-4e4e-86db-1c31bb718977` +
      `&redirect_uri=http://localhost:3000/settings/hs-api-listener` +
      `&scope=tickets%20e-commerce%20crm.objects.contacts.read%20crm.objects.contacts.write%20crm.objects.companies.write%20crm.objects.companies.read`;
    window.open(url, '_blank');
  };

  return (
    <div className={styles.hubspotCore}>
      {isLoading ? (
        <div className={styles.loader}>
          <Placeholder numberRows={3} numberParagraphs={1} />
        </div>
      ) : (
        <>
          {!isAuthenticated && (
            <>
              <div className={styles.hubspotCore__details}>
                <p className={styles.hubspotCore__label}>Hubspot setup is ready to start</p>
                <p className={styles.hubspotCore__description}>
                  When the migration is done, your supply chain will be fully automated through a
                  lightning speed and robust algorithm, so now you can ensure your fast-selling
                  inventories are always in-stock and optimized in quantity.
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
                Agree and authorize access
              </ActionButton>
            </>
          )}
          {isAuthenticated && (
            <HubSpotIntegrationAuthenticated
              setIsAuthenticated={setIsAuthenticated}
              hubspotAuthId={hubSpotAuthCode}
            />
          )}
        </>
      )}
    </div>
  );
};

export default HubSpotIntegrationCore;

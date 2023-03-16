import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader } from 'semantic-ui-react';

/* Styles */
import styles from './index.module.scss';

/* Components */
import SettingsNav from '../../SettingsNav';
import PageHeader from '../../../../components/PageHeader';
import HubSpotIntegrationRedirectMeta from './HubSpotIntegrationRedirectMeta';
import BoxContainerSettings from '../../../../components/BoxContainerSettings';
import ElevioArticle from '../../../../components/ElevioArticle';

/* Utils */
import { error } from '../../../../utils/notifications';
import history from '../../../../history';

/* Constants */
import { AppConfig } from '../../../../config';

/* Selectors */
import { sellerIDSelector } from '../../../../selectors/Seller';

interface Props {
  match: any;
}

const HubSpotIntegrationRedirect = (props: Props) => {
  const { match } = props;
  const [isConnectedToHubspot, setIsConnectedToHubspot] = useState<boolean>(false);
  const authenticateHubspotApi = async () => {
    const myParam = window.location.search;
    const hubspotCode = new URLSearchParams(myParam).get('code');
    try {
      const sellerId = sellerIDSelector();
      const res = await axios.post(`${AppConfig.BASE_URL_API}sellers/${sellerId}/hubspot-auth`, {
        hubspot_oauth_code: hubspotCode,
      });
      if (res.status === 201) {
        setIsConnectedToHubspot(true);
      }
    } catch (e) {
      if (e.response && e.response.data) {
        error(e.response.data.message);
      }
    }
  };

  useEffect(() => {
    authenticateHubspotApi();
  }, []);

  useEffect(() => {
    if (isConnectedToHubspot) {
      console.log('connected');
      setTimeout(() => {
        history.push('/settings/hs-mapping');
      }, 3000);
    }
  }, [isConnectedToHubspot]);

  return (
    <main className={styles.settingWrapper}>
      <PageHeader
        title={'Hubspot Setup'}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'Settings' },
          { content: 'Hubspot Setup' },
        ]}
        auth={match.params.auth}
      />
      <SettingsNav match={match} />
      <div className={styles.settingPerimeter}>
        <HubSpotIntegrationRedirectMeta />
        <div className={styles.settingsPageWrapper}>
          <div className={styles.settingsTableWrapper}>
            {!isConnectedToHubspot && (
              <div className={styles.hubspotRedirectDetails}>
                <div className={styles.hubspotRedirectDetails__labelBox}>
                  <p className={styles.hubspotRedirectDetails__labelBox__label}>
                    Hubspot connection is in progress
                  </p>
                  <Loader inline active className={styles.loader} />
                </div>
                <p className={styles.hubspotRedirectDetails__labelBox__description}>
                  You will be up and running in few seconds.
                </p>
              </div>
            )}
            {isConnectedToHubspot && (
              <div className={styles.hubspotRedirectDetails}>
                <p className={styles.hubspotRedirectDetails__labelBox__label}>
                  Congratulations! You are now connected.
                </p>
                <p className={styles.hubspotRedirectDetails__labelBox__description}>
                  Map Sellgo property to Hubspot field.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <BoxContainerSettings className={styles.elevioArticle}>
        <span>Step-By-Step Guide</span>
        <ElevioArticle articleId={'27'} />
      </BoxContainerSettings>
    </main>
  );
};

export default HubSpotIntegrationRedirect;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader } from 'semantic-ui-react';

/* Styles */
import styles from './index.module.scss';

/* Components */
import SettingsNav from '../../SettingsNav';
import PageHeader from '../../../../components/PageHeader';
import HubSpotIntegrationMappingStructure from './MappingStructure';
import BoxContainerSettings from '../../../../components/BoxContainerSettings';
import ElevioArticle from '../../../../components/ElevioArticle';
import HubSpotIntegrationMappingMeta from './HubSpotIntegrationRedirectMeta';
import HubSpotRulesSync from './HubspotRuleSync';

/* Selectors */
import { sellerIDSelector } from '../../../../selectors/Seller';

/* Utils */
import history from '../../../../history';
import { AppConfig } from '../../../../config';

interface Props {
  match: any;
}

const HubSpotIntegrationMapping = (props: Props) => {
  const { match } = props;
  const [step, setStep] = useState<number>(0);
  const [isAuthenticationChecking, setIsAuthenticationChecking] = useState<boolean>(true);

  const [hubspotProperties, setHubspotProperties] = useState<any[]>([]);

  const getHubspotAuth = async () => {
    setIsAuthenticationChecking(true);
    try {
      const sellerId = sellerIDSelector();
      const res = await axios.get(`${AppConfig.BASE_URL_API}sellers/${sellerId}/hubspot-auth`);
      if (res.status === 200) {
        const { data } = res;
        if (data?.status !== 'active') {
          history.push('/settings/integration/hubspot');
        }
        setIsAuthenticationChecking(false);
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

  const getHubspotProperties = async () => {
    try {
      const sellerId = sellerIDSelector();
      const type = step === 0 ? 'companies' : 'contacts';
      const res = await axios.get(
        `${AppConfig.BASE_URL_API}sellers/${sellerId}/hubspot-properties/${type}`
      );
      if (res.status === 200) {
        const { data } = res;
        const properties = data.map((hubspotProperty: any) => {
          return {
            text: hubspotProperty.label,
            key: hubspotProperty.name,
            value: hubspotProperty.name,
          };
        });
        setHubspotProperties([...properties]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setHubspotProperties([]);
    getHubspotProperties();
  }, [step]);

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
        <HubSpotIntegrationMappingMeta />
        {isAuthenticationChecking && <Loader />}
        {!isAuthenticationChecking && (
          <div className={styles.settingsPageWrapper}>
            <div className={styles.settingsTableWrapper}>
              {step === 0 && <p>Map Sellgo Company property to Hubspot field.</p>}
              {step === 1 && <p>Map Sellgo Contacts property to Hubspot field.</p>}
              {(step === 0 || step === 1) && hubspotProperties.length > 0 && (
                <HubSpotIntegrationMappingStructure
                  mappingType={step === 0 ? 'companies' : 'contacts'}
                  hubspotProperties={hubspotProperties}
                  step={step}
                  setStep={setStep}
                />
              )}
              {step === 2 && <HubSpotRulesSync setStep={setStep} />}
            </div>
          </div>
        )}
      </div>
      <BoxContainerSettings className={styles.elevioArticle}>
        <span>Step-By-Step Guide</span>
        <ElevioArticle articleId={'27'} />
      </BoxContainerSettings>
    </main>
  );
};

export default HubSpotIntegrationMapping;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

/* Styles */
import styles from './index.module.scss';

/* Components */
import SettingsNav from '../../SettingsNav';
import PageHeader from '../../../../components/PageHeader';
// import { error } from '../../../../utils/notifications';
// import history from '../../../../history';
import { sellerIDSelector } from '../../../../selectors/Seller';
import HubSpotIntegrationMappingStructure from './MappingStructure';
import BoxContainerSettings from '../../../../components/BoxContainerSettings';
import ElevioArticle from '../../../../components/ElevioArticle';
import HubSpotIntegrationMappingMeta from './HubSpotIntegrationRedirectMeta';

interface Props {
  match: any;
}

const HubSpotIntegrationMapping = (props: Props) => {
  const { match } = props;
  const [step, setStep] = useState<number>(0);
  const [hubspotProperties, setHubspotProperties] = useState<any[]>([]);
  const getHubspotProperties = async () => {
    try {
      const sellerId = sellerIDSelector();
      const type = step === 0 ? 'companies' : 'contacts';
      const res = await axios.get(
        `http://3.230.118.67/api/sellers/${sellerId}/hubspot-properties/${type}`
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
        console.log('Proper', properties);
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

        <div className={styles.settingsPageWrapper}>
          <div className={styles.settingsTableWrapper}>
            {step === 0 ? (
              <p>Map Sellgo Company property to Hubspot field.</p>
            ) : (
              <p>Map Sellgo Contacts property to Hubspot field.</p>
            )}
            {hubspotProperties.length > 0 && (
              <HubSpotIntegrationMappingStructure
                mappingType={step === 0 ? 'companies' : 'contacts'}
                hubspotProperties={hubspotProperties}
                step={step}
                setStep={setStep}
              />
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

export default HubSpotIntegrationMapping;

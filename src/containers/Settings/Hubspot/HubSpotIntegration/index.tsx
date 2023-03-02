import React from 'react';

/* Styles */
import styles from './index.module.scss';

/* Components */
import HubSpotIntegrationMeta from './HubSpotIntegrationMeta';
import HubSpotIntegrationCore from './HubSpotIntegrationCore';
import SettingsNav from '../../SettingsNav';
import PageHeader from '../../../../components/PageHeader';
import ElevioArticle from '../../../../components/ElevioArticle';
import BoxContainerSettings from '../../../../components/BoxContainerSettings';

interface Props {
  match: any;
}

const HubSpotIntegration = (props: Props) => {
  const { match } = props;

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
        <HubSpotIntegrationMeta />
        <div className={styles.settingsPageWrapper}>
          <div className={styles.settingsTableWrapper}>
            <HubSpotIntegrationCore />
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

export default HubSpotIntegration;

import React from 'react';

/* Styles */
import styles from './index.module.scss';

/* Components */
import RestockLimitMeta from './RestockLimitMeta';
import RestockLimitCore from './RestockLimitCore';
import SettingsNav from '../../SettingsNav';
import PageHeader from '../../../../components/PageHeader';
import ElevioArticle from '../../../../components/ElevioArticle';
import BoxContainerSettings from '../../../../components/BoxContainerSettings';
import GetStarted from '../../../PerfectStock/GetStarted';

interface Props {
  match: any;
}

const RestockLimit = (props: Props) => {
  const { match } = props;

  return (
    <main className={styles.settingWrapper}>
      <PageHeader
        title={'Restock Limit'}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'AiStock' },
          { content: 'Restock Limit Settings' },
        ]}
        auth={match.params.auth}
      />
      <SettingsNav match={match} />

      <div className={styles.settingPerimeter}>
        <RestockLimitMeta />
        <div className={styles.settingsPageWrapper}>
          <div className={styles.settingsTableWrapper}>
            <RestockLimitCore />
          </div>
        </div>
      </div>

      <BoxContainerSettings className={styles.elevioArticle}>
        <span>Step-By-Step Guide</span>
        <ElevioArticle articleId={''} />
      </BoxContainerSettings>
      <GetStarted />
    </main>
  );
};

export default RestockLimit;

import React from 'react';

/* Styles */
import styles from './index.module.scss';

/* Components */
import SalesForcastingInventoryHistoryMeta from './SalesForcastingInventoryHistoryMeta';
import SalesForcastingInventoryHistoryCore from './SalesForcastingInventoryHistoryCore';
import SettingsNav from '../../SettingsNav';
import PageHeader from '../../../../components/PageHeader';
import ElevioArticle from '../../../../components/ElevioArticle';
import BoxContainerSettings from '../../../../components/BoxContainerSettings';
import GetStarted from '../../../PerfectStock/GetStarted';

interface Props {
  match: any;
}

const SalesForcastingInventoryHistory = (props: Props) => {
  const { match } = props;

  return (
    <main className={styles.settingWrapper}>
      <PageHeader
        title={'Lead Time'}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'AiStock' },
          { content: 'Sales Forcasting settings' },
        ]}
        auth={match.params.auth}
      />
      <SettingsNav match={match} />
      <div className={styles.settingPerimeter}>
        <SalesForcastingInventoryHistoryMeta />
        <div className={styles.settingsPageWrapper}>
          <div className={styles.settingsTableWrapper}>
            <SalesForcastingInventoryHistoryCore />
          </div>
        </div>
      </div>
      <BoxContainerSettings className={styles.elevioArticle}>
        <span>Step-By-Step Guide</span>
        <ElevioArticle articleId={'27'} />
      </BoxContainerSettings>
      <GetStarted />
    </main>
  );
};

export default SalesForcastingInventoryHistory;

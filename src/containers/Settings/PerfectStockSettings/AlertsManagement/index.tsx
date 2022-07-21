import React from 'react';

/* Styles */
import styles from './index.module.scss';

/* Components */
import SettingsNav from '../../SettingsNav';
import PageHeader from '../../../../components/PageHeader';
import AlertsManagementMeta from './AlertsManagementMeta';
import AlertsManagementCore from './AlertsManagementCore';

interface Props {
  match: any;
}

const AlertsManagement = (props: Props) => {
  const { match } = props;

  return (
    <main className={styles.settingWrapper}>
      <PageHeader
        title={'Alerts Management'}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'AiStock' },
          { content: 'Alerts Management Settings' },
        ]}
        auth={match.params.auth}
      />
      <SettingsNav match={match} />
      <div className={styles.settingPerimeter}>
        <AlertsManagementMeta />
        <div className={styles.settingsPageWrapper}>
          <div className={styles.settingsTableWrapper}>
            <AlertsManagementCore />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AlertsManagement;

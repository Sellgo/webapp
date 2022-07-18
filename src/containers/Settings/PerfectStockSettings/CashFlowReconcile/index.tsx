import React from 'react';

/* Styles */
import styles from './index.module.scss';

/* Components */
import CashFlowReconcileMeta from './CashFlowReconcileMeta';
import CashFlowReconcileCore from './CashFlowReconcileCore';
import SettingsNav from '../../SettingsNav';
import PageHeader from '../../../../components/PageHeader';
import ElevioArticle from '../../../../components/ElevioArticle';
import BoxContainerSettings from '../../../../components/BoxContainerSettings';

interface Props {
  match: any;
}

const MiscExpenses = (props: Props) => {
  const { match } = props;

  return (
    <main className={styles.settingWrapper}>
      <PageHeader
        title={'Cash Flow Reconcile'}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'AiStock' },
          { content: 'Cash Flow Reconcile Settings' },
        ]}
        auth={match.params.auth}
      />
      <SettingsNav match={match} />
      <div className={styles.settingPerimeter}>
        <CashFlowReconcileMeta />
        <div className={styles.settingsPageWrapper}>
          <div className={styles.settingsTableWrapper}>
            <CashFlowReconcileCore />
          </div>
        </div>
      </div>
      <BoxContainerSettings className={styles.elevioArticle}>
        <span>Step-By-Step Guide</span>
        <ElevioArticle articleId={''} />
      </BoxContainerSettings>
    </main>
  );
};

export default MiscExpenses;

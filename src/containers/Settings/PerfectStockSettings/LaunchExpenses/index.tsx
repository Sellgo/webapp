import React from 'react';

/* Styles */
import styles from './index.module.scss';

/* Components */
import LaunchExpensesMeta from './LaunchExpensesMeta';
import LaunchExpensesCore from './LaunchExpensesCore';
import SettingsNav from '../../SettingsNav';
import PageHeader from '../../../../components/PageHeader';
import ElevioArticle from '../../../../components/ElevioArticle';
import BoxContainerSettings from '../../../../components/BoxContainerSettings';
import GetStarted from '../../../PerfectStock/GetStarted';

interface Props {
  match: any;
}

const LaunchExpenses = (props: Props) => {
  const { match } = props;

  return (
    <main className={styles.settingWrapper}>
      <PageHeader
        title={'Product Launch Expenses'}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'AiStock' },
          { content: 'Product Launch Expenses Settings' },
        ]}
        auth={match.params.auth}
      />
      <SettingsNav match={match} />
      <div className={styles.settingPerimeter}>
        <LaunchExpensesMeta />
        <div className={styles.settingsPageWrapper}>
          <div className={styles.settingsTableWrapper}>
            <LaunchExpensesCore />
          </div>
        </div>
      </div>
      <BoxContainerSettings className={styles.elevioArticle}>
        <span>Step-By-Step Guide</span>
        <ElevioArticle articleId={'33'} />
      </BoxContainerSettings>
      <GetStarted />
    </main>
  );
};

export default LaunchExpenses;

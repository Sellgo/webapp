import React from 'react';

/* Styles */
import styles from './index.module.scss';

/* Components */
import EmployeeExpensesMeta from './EmployeeExpensesMeta';
import EmployeeExpensesCore from './EmployeeExpensesCore';
import SettingsNav from '../../SettingsNav';
import PageHeader from '../../../../components/PageHeader';
import ElevioArticle from '../../../../components/ElevioArticle';
import BoxContainerSettings from '../../../../components/BoxContainerSettings';

interface Props {
  match: any;
}

const EmployeeExpenses = (props: Props) => {
  const { match } = props;

  return (
    <main className={styles.settingWrapper}>
      <PageHeader
        title={'Lead Time'}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'AiStock' },
          { content: 'Days Of Inventory Settings' },
        ]}
        auth={match.params.auth}
      />
      <SettingsNav match={match} />
      <div className={styles.settingPerimeter}>
        <EmployeeExpensesMeta />
        <div className={styles.settingsPageWrapper}>
          <div className={styles.settingsTableWrapper}>
            <EmployeeExpensesCore />
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

export default EmployeeExpenses;

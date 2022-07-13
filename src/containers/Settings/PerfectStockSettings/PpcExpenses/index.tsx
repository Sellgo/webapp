import React from 'react';

/* Styles */
import styles from './index.module.scss';

/* Components */
import PpcExpensesMeta from './PpcExpensesMeta';
import PpcExpensesCore from './PpcExpensesCore';
import SettingsNav from '../../SettingsNav';
import PageHeader from '../../../../components/PageHeader';
import ElevioArticle from '../../../../components/ElevioArticle';
import BoxContainer from '../../../../components/BoxContainer';

interface Props {
  match: any;
}

const PpcExpenses = (props: Props) => {
  const { match } = props;

  return (
    <main className={styles.settingWrapper}>
      <PageHeader
        title={'PPC Expenses'}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'AiStock' },
          { content: 'PPC Expenses Settings' },
        ]}
        auth={match.params.auth}
      />
      <SettingsNav match={match} />
      <div className={styles.settingPerimeter}>
        <PpcExpensesMeta />
        <div className={styles.settingsPageWrapper}>
          <div className={styles.settingsTableWrapper}>
            <PpcExpensesCore />
          </div>
        </div>
      </div>
      <BoxContainer className={styles.elevioArticle}>
        <span>Step-By-Step Guide</span>
        <ElevioArticle articleId={'17'} />
      </BoxContainer>
    </main>
  );
};

export default PpcExpenses;

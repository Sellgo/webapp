import React from 'react';

/* Styles */
import styles from './index.module.scss';

/* Components */
import DutyTaxMeta from '../DutyTax/DutyTaxMeta';
import DutyTaxCore from '../DutyTax/DutyTaxCore';
import SettingsNav from '../../SettingsNav';
import PageHeader from '../../../../components/PageHeader';
import ElevioArticle from '../../../../components/ElevioArticle';
import BoxContainer from '../../../../components/BoxContainer';

interface Props {
  match: any;
}

const DutyTax = (props: Props) => {
  const { match } = props;

  return (
    <main className={styles.settingWrapper}>
      <PageHeader
        title={'Lead Time'}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'AiStock' },
          { content: 'Duty Tax Settings' },
        ]}
        auth={match.params.auth}
      />
      <SettingsNav match={match} />
      <div className={styles.settingPerimeter}>
        <DutyTaxMeta />
        <div className={styles.settingsPageWrapper}>
          <div className={styles.settingsTableWrapper}>
            <DutyTaxCore />
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

export default DutyTax;

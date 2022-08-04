import React from 'react';

/* Styles */
import styles from './index.module.scss';

/* Components */
import PaymentTermsMeta from '../PaymentTerms/PaymentTermsMeta';
import PaymentTermsCore from '../PaymentTerms/PaymentTermsCore';
import SettingsNav from '../../SettingsNav';
import PageHeader from '../../../../components/PageHeader';
import ElevioArticle from '../../../../components/ElevioArticle';
import BoxContainerSettings from '../../../../components/BoxContainerSettings';

interface Props {
  match: any;
}

const PaymentTerms = (props: Props) => {
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
        <PaymentTermsMeta />
        <div className={styles.settingsPageWrapper}>
          <div className={styles.settingsTableWrapper}>
            <PaymentTermsCore />
          </div>
        </div>
      </div>
      <BoxContainerSettings className={styles.elevioArticle}>
        <span>Step-By-Step Guide</span>
        <ElevioArticle articleId={'30'} />
      </BoxContainerSettings>
    </main>
  );
};

export default PaymentTerms;

import React from 'react';

/* Styles */
import styles from './index.module.scss';

/* Components */
import SalesForecastingWeightsMeta from './SalesForecastingWeightsMeta';
import SalesForecastingWeightsCore from './SalesForecastingWeightsCore';
import SettingsNav from '../../SettingsNav';
import PageHeader from '../../../../components/PageHeader';
import ElevioArticle from '../../../../components/ElevioArticle';
import BoxContainerSettings from '../../../../components/BoxContainerSettings';
import GetStarted from '../../../PerfectStock/GetStarted';

interface Props {
  match: any;
}

const SalesForecastingAdjustor = (props: Props) => {
  const { match } = props;

  return (
    <main className={styles.settingWrapper}>
      <PageHeader
        title={'SKU Settings'}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'AiStock' },
          { content: 'Weighted Average Sales' },
        ]}
        auth={match.params.auth}
      />
      <SettingsNav match={match} />
      <div className={styles.settingPerimeter}>
        <SalesForecastingWeightsMeta />
        <div className={styles.settingsPageWrapper}>
          <div className={styles.settingsTableWrapper}>
            <SalesForecastingWeightsCore />
          </div>
        </div>
      </div>
      <BoxContainerSettings className={styles.elevioArticle}>
        <span>Step-By-Step Guide</span>
        <ElevioArticle articleId={'25'} />
      </BoxContainerSettings>
      <GetStarted />
    </main>
  );
};

export default SalesForecastingAdjustor;

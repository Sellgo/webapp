import React from 'react';

/* Styles */
import styles from './index.module.scss';

/* Components */
import SkuSettingsMeta from '../SkuSettings/SkuSettingsMeta';
//import SkuSettingsCore from '../SkuSettings/SkuSettingsCore';
import SettingsNav from '../../SettingsNav';
import PageHeader from '../../../../components/PageHeader';
import ElevioArticle from '../../../../components/ElevioArticle';
import BoxContainer from '../../../../components/BoxContainer';

interface Props {
  match: any;
}

const SkuSettings = (props: Props) => {
  const { match } = props;

  return (
    <main className={styles.leadTimeWrapper}>
      <PageHeader
        title={'Lead Time'}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'AiStock' },
          { content: 'SKU Settings' },
        ]}
        auth={match.params.auth}
      />
      <SettingsNav match={match} />
      <div className={styles.leadTime}>
        <SkuSettingsMeta />
        <div className={styles.settingsPageWrapper}>
          <div className={styles.settingsTableWrapper}>{/*<SkuSettingsCore />*/}</div>
        </div>
      </div>
      <BoxContainer className={styles.elevioArticle}>
        <span>Step-By-Step Guide</span>
        <ElevioArticle articleId={'17'} />
      </BoxContainer>
    </main>
  );
};

export default SkuSettings;

import React from 'react';

/* Styles */
import styles from './index.module.scss';

/* Components */
import Replenishment3PLMeta from './ShipmentPackingMeta';
import ContainersCore from './ShipmentPackingCore';
import SettingsNav from '../../SettingsNav';
import PageHeader from '../../../../components/PageHeader';
import BoxContainer from '../../../../components/BoxContainer';
import ElevioArticle from '../../../../components/ElevioArticle';

interface Props {
  match: any;
}

const ShipmentPacking = (props: Props) => {
  const { match } = props;

  return (
    <main className={styles.settingWrapper}>
      <PageHeader
        title={'Lead Time'}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'AiStock' },
          { content: 'Storage Details' },
        ]}
        auth={match.params.auth}
      />
      <SettingsNav match={match} />
      <div className={styles.settingPerimeter}>
        <Replenishment3PLMeta />
        <div className={styles.settingsPageWrapper}>
          <div className={styles.settingsTableWrapper}>
            <ContainersCore />
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

export default ShipmentPacking;

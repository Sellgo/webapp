import React from 'react';

/* Styles */
import styles from './index.module.scss';

/* Components */
import DaysOfInventoryMeta from '../DaysOfInventory/DaysOfInventoryMeta';
import DaysOfInventoryCore from '../DaysOfInventory/DaysOfInventoryCore';
import SettingsNav from '../../SettingsNav';
import PageHeader from '../../../../components/PageHeader';
import ElevioArticle from '../../../../components/ElevioArticle';
import BoxContainer from '../../../../components/BoxContainer';

interface Props {
  match: any;
}

const DaysOfInventory = (props: Props) => {
  const { match } = props;

  return (
    <main className={styles.leadTimeWrapper}>
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
      <div className={styles.leadTime}>
        <DaysOfInventoryMeta />
        <div className={styles.settingsPageWrapper}>
          <div className={styles.settingsTableWrapper}>
            <DaysOfInventoryCore />
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

export default DaysOfInventory;

import React from 'react';

/* Styles */
import styles from './index.module.scss';

/* Components */
import ContainersMeta from './ContainersMeta';
import ContainersCore from './ContainersCore';
//import DaysOfInventoryGroup from './DaysOfInventoryGroup';
import SettingsNav from '../../SettingsNav';
import PageHeader from '../../../../components/PageHeader';
import BoxContainer from '../../../../components/BoxContainer';
import ElevioArticle from '../../../../components/ElevioArticle';

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
          { content: 'Default Container' },
        ]}
        auth={match.params.auth}
      />
      <SettingsNav match={match} />
      <div className={styles.leadTime}>
        <ContainersMeta />
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

      {/*<div className={styles.instructionsBox}>
              <span>Step-By-Step Guide</span>
              <ElevioArticle articleId={'17'} />
    </div>*/}
    </main>
  );
};

export default DaysOfInventory;

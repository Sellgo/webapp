import React from 'react';
import PageHeader from '../../../components/PageHeader';
import styles from './index.module.scss';
import SpApiForm from './SpApiForm';
import SettingsNav from '../SettingsNav';

/* Components */
import ElevioArticle from '../../../components/ElevioArticle';
import BoxContainer from '../../../components/BoxContainer';

interface Props {
  match: any;
  hideSettingsNav?: boolean;
}

const Connectivity = (props: Props) => {
  const { match, hideSettingsNav } = props;
  return (
    <main className={styles.settingWrapper}>
      <PageHeader
        title={'Amazon SP-API Connectivity'}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'Settings' },
          { content: 'Amazon SP-API Connectivity' },
        ]}
        auth={match.params.auth}
      />

      {!hideSettingsNav && <SettingsNav match={match} />}
      <div className={styles.settingPerimeter}>
        <div className={styles.settingsPageWrapper}>
          <div className={styles.settingsTableWrapper}>
            <SpApiForm />
          </div>
        </div>
      </div>
      <BoxContainer className={styles.elevioArticle}>
        <span>Step-By-Step Guide</span>
        <ElevioArticle articleId={'19'} />
      </BoxContainer>
    </main>
  );
};

export default Connectivity;

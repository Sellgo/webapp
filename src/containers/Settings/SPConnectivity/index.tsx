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
    <>
      <PageHeader
        title={'Connectivity'}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'Settings' },
          { content: 'Connectivity' },
        ]}
        auth={match.params.auth}
      />
      <main className={styles.connectivityPageWrapper}>
        {!hideSettingsNav && <SettingsNav match={match} />}
        <SpApiForm />
        <BoxContainer className={styles.elevioArticle}>
          <span>Step-By-Step Guide</span>
          <ElevioArticle articleId={'19'} />
        </BoxContainer>
      </main>
    </>
  );
};

export default Connectivity;

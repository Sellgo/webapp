import React from 'react';
import PageHeader from '../../../components/PageHeader';
import styles from './index.module.scss';
import APIForm from './APIForm';
import PilotLoginHeader from '../../../components/PilotLoginHeader';
import SettingsNav from '../SettingsNav';

/* Utils */
import { isFirstTimeLoggedIn } from '../../../utils/subscriptions';

interface Props {
  match: any;
  history: any;
}
const APIConnectivity = (props: Props) => {
  const { match, history } = props;
  const firstTimeLoggedIn = isFirstTimeLoggedIn();

  return (
    <>
      {firstTimeLoggedIn ? (
        <PilotLoginHeader />
      ) : (
        <PageHeader
          title={'API Keys'}
          breadcrumb={[
            { content: 'Home', to: '/' },
            { content: 'Settings' },
            { content: 'API Keys' },
          ]}
          auth={match.params.auth}
        />
      )}
      <main className={styles.connectivityPageWrapper}>
        <SettingsNav match={match} history={history} />
        <APIForm />
      </main>
    </>
  );
};

export default APIConnectivity;

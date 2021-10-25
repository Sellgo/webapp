import React from 'react';
import PageHeader from '../../../components/PageHeader';
import styles from './index.module.scss';
import MWSForm from './MWSForm';
import PilotLoginHeader from '../../../components/PilotLoginHeader';
import SettingsNav from '../SettingsNav';

/* Utils */
import { isFirstTimeLoggedIn } from '../../../utils/subscriptions';

interface Props {
  match: any;
  history: any;
}
const Connectivity = (props: Props) => {
  const { match, history } = props;
  const firstTimeLoggedIn = isFirstTimeLoggedIn();
  return (
    <>
      {firstTimeLoggedIn ? (
        <PilotLoginHeader />
      ) : (
        <PageHeader
          title={'Connectivity'}
          breadcrumb={[
            { content: 'Home', to: '/' },
            { content: 'Settings' },
            { content: 'Connectivity' },
          ]}
          auth={match.params.auth}
        />
      )}
      <main className={styles.connectivityPageWrapper}>
        <SettingsNav match={match} history={history} />
        <MWSForm />
      </main>
    </>
  );
};

export default Connectivity;

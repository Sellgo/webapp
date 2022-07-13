import React from 'react';
import PageHeader from '../../../components/PageHeader';
import styles from './index.module.scss';
import MWSForm from './MWSForm';
import SettingsNav from '../SettingsNav';

interface Props {
  match: any;
}
const Connectivity = (props: Props) => {
  const { match } = props;
  return (
    <>
      <PageHeader
        title={'Connectivity'}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'Settings' },
          { content: 'Amazon SP-API Connectivity' },
        ]}
        auth={match.params.auth}
      />
      <main className={styles.connectivityPageWrapper}>
        <SettingsNav match={match} />
        <MWSForm />
      </main>
    </>
  );
};

export default Connectivity;

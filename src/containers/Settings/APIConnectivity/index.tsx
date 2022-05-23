import React from 'react';
import PageHeader from '../../../components/PageHeader';
import styles from './index.module.scss';
import APIForm from './APIForm';
import SettingsNav from '../SettingsNav';

interface Props {
  match: any;
}
const APIConnectivity = (props: Props) => {
  const { match } = props;

  return (
    <>
      <PageHeader
        title={'API Keys'}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'Settings' },
          { content: 'API Keys' },
        ]}
        auth={match.params.auth}
      />
      <div className={styles.connectivityPageWrapper}>
        <SettingsNav match={match} />
        <div>
          <APIForm />
        </div>
      </div>
    </>
  );
};

export default APIConnectivity;

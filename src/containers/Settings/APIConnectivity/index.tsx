import React from 'react';
import PageHeader from '../../../components/PageHeader';
import styles from './index.module.scss';
import APIForm from './APIForm';
import ProfileBoxHeader from '../../../components/ProfileBoxHeader';
import ProfileBoxContainer from '../../../components/ProfileBoxContainer';

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
      <main className={styles.connectivityPageWrapper}>
        <ProfileBoxHeader>API Keys</ProfileBoxHeader>
        <ProfileBoxContainer>
          <p className={styles.apiFormTitle}> Please select your API keys below. </p>
          <APIForm />
        </ProfileBoxContainer>
      </main>
    </>
  );
};

export default APIConnectivity;

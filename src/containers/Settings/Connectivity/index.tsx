import React from 'react';
import PageHeader from '../../../components/PageHeader';
import styles from './index.module.scss';
import MWSForm from './MWSForm';

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
          { content: 'Connectivity' },
        ]}
        auth={match.params.auth}
      />
      <main className={styles.connectivityPageWrapper}>
        <MWSForm />
      </main>
    </>
  );
};

export default Connectivity;

import React from 'react';

/* Styles */
import styles from './index.module.scss';

/* Components */
import PageHeader from '../../components/PageHeader';
import MerchantEmployeesMeta from './MerchantEmployeesMeta';
import MerchantEmployeesCore from './MerchantEmployeesCore';
interface Props {
  match: any;
}

const MerchantEmployees = (props: Props) => {
  const { match } = props;
  return (
    <main className={styles.settingWrapper}>
      <PageHeader
        title={`Seller Research`}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'Seller Research', to: '/seller-research/database' },
          {
            content: 'Merchant Employees',
          },
        ]}
        auth={match.params.auth}
      />
      <div className={styles.settingPerimeter}>
        <MerchantEmployeesMeta />
        <div className={styles.settingsPageWrapper}>
          <div className={styles.settingsTableWrapper}>
            <MerchantEmployeesCore />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MerchantEmployees;

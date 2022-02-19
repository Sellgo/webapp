import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import history from '../../../history';
import AccountConnectionSection from './AccountConnectionSection';
import ExtensionSection from './ExtensionSection';
import FeaturesSection from './FeaturesSection';

/* Selectors */
import { getSellerSubscription } from '../../../selectors/Subscription';

/* Types */
import { SellerSubscription } from '../../../interfaces/Seller';

/* Actions */
import { fetchSellerSubscription } from '../../../actions/Settings/Subscription';

/* Constants */
import { PERFECT_STOCK_SELLER_STATUS } from '../../../constants/PerfectStock';

interface Props {
  subscription: SellerSubscription;
  fetchSellerSubscription: () => void;
}

const MigratingDisplay = (props: Props) => {
  const { subscription, fetchSellerSubscription } = props;

  React.useEffect(() => {
    if (subscription.perfect_stock_status === PERFECT_STOCK_SELLER_STATUS.MIGRATION_IN_PROGRESS) {
      /* Keep checking subscription every 2 seconds */
      const interval = setInterval(() => {
        fetchSellerSubscription();
        if (
          subscription.perfect_stock_status !== PERFECT_STOCK_SELLER_STATUS.MIGRATION_IN_PROGRESS
        ) {
          clearInterval(interval);
          history.push('/aistock/sales');
        }
      }, 2000);
    }
  }, []);
  return (
    <>
      <main className={styles.pilotLoginPageWrapper}>
        <AccountConnectionSection />
        <ExtensionSection />
        <FeaturesSection />
      </main>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    subscription: getSellerSubscription(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSellerSubscription: () => dispatch(fetchSellerSubscription()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MigratingDisplay);

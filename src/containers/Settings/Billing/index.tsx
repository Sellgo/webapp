import React from 'react';
import { connect } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

/* Actions */
import { fetchSellerSubscription } from '../../../actions/Settings/Subscription';
import { getSellerInfo } from '../../../actions/Settings';

/* Styling */
import styles from './index.module.scss';

/* Components */
import PageHeader from '../../../components/PageHeader';
import UpdateCardForm from './UpdateCardForm';

/* Types */
import { Subscription } from '../../../interfaces/Seller';
import { AppConfig } from '../../../config';

const stripePromise = loadStripe(AppConfig.STRIPE_API_KEY);

interface Props {
  getSeller: () => void;
  fetchSellerSubscription: () => void;
  sellerSubscription: any;
  location: any;

  subscriptions: Subscription[];
  profile: any;
  subscriptionType: string;
  subscriptionPlan: string;
  match: any;
}

const Billing = (props: Props) => {
  // const { subscriptions, profile, location, subscriptionPlan,
  // subscriptionType, match, getSeller, fetchSellerSubscription } = props;
  const { match, fetchSellerSubscription } = props;
  // const sellerID = localStorage.getItem('userId');
  React.useEffect(() => {
    getSellerInfo();
    fetchSellerSubscription();
  }, []);

  return (
    <>
      <PageHeader
        title={'Billing'}
        breadcrumb={[
          { content: 'Home', to: '/' },
          { content: 'Settings', to: '/settings' },
          { content: 'Billing' },
        ]}
        auth={match.params.auth}
      />

      <main className={styles.billingPage}>
        <div>
          <div className={styles.boxHeading}>Header</div>
          <div className={styles.billingBox}>
            <Elements stripe={stripePromise}>
              <UpdateCardForm />
            </Elements>
          </div>
          <div className={styles.boxFooter}>Footer</div>
        </div>
        <div>
          <div className={styles.boxHeading}>Header</div>
          <div className={styles.billingBox}>Helo!</div>
          <div className={styles.boxFooter}>Footer</div>
        </div>
      </main>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  profile: state.settings.profile,
  sellerSubscription: state.subscription.sellerSubscription,
  subscriptionType: state.subscription.subscriptionType,
  subscriptions: state.subscription.subscriptions,
  subscriptionPlan: state.subscription.plan,
});

const mapDispatchToProps = {
  getSeller: () => getSellerInfo(),
  fetchSellerSubscription: () => fetchSellerSubscription(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Billing);

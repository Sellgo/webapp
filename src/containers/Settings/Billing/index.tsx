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
import PlanTypeButton from '../../../components/PlanTypeButton';
import NewQuotaMeter from '../../../components/NewQuotaMeter';

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

      <main className={styles.billingPageWrapper}>
        <section>
          <div className={styles.wrapperHeading}>Billing</div>
          <div className={styles.billingWrapper}>
            <div className={styles.quotaBox}>
              <p className={styles.planTitle}> Your Plan</p>
              <div className={styles.quotaContent}>
                <PlanTypeButton plan="Professional" />
                <div className={styles.quotaBarsWrapper}>
                  <NewQuotaMeter type="productTracker" quota={{ used: 50, available: 100 }} />
                  <NewQuotaMeter type="productTracker" quota={{ used: 50, available: 100 }} />
                  <NewQuotaMeter type="productTracker" quota={{ used: 50, available: 100 }} />
                  <NewQuotaMeter type="productTracker" quota={{ used: 50, available: 100 }} />
                </div>
                <div className={styles.actionRow}>
                  <p> Action </p>
                  <button> Change Plan</button>
                </div>
              </div>
            </div>

            <div className={styles.paymentBox}>
              <p className={styles.paymentTitle}> Payment Method</p>
              <div className={styles.paymentContent}>moshi</div>
            </div>
          </div>
          <div className={styles.wrapperFooter}>
            If you have trouble with the payment setting, you can contact us at support@sellgo.com.
            We Can Help.
          </div>
        </section>

        <section>
          <div className={`${styles.wrapperHeading} ${styles.wrapperHeading_billingHistory}`}>
            Billing History
          </div>
          <div className={styles.billingHistoryBox}>Helo!</div>
        </section>

        <Elements stripe={stripePromise}>
          <UpdateCardForm />
        </Elements>
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

import React from 'react';
import { Confirm } from 'semantic-ui-react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import Axios from 'axios';

/* Utils */
import { success, error } from '../../../../utils/notifications';
import history from '../../../../history';
import LeftArrow from '../../../../assets/images/leftArrowLong.svg';
import { convertPlanNameToKey, isSubscriptionIdFreeTrial } from '../../../../utils/subscriptions';

/* Config */
import { AppConfig } from '../../../../config';

/* Actions */
import {
  fetchSellerSubscription,
  fetchSubscriptions,
  setSellerSubscription,
} from '../../../../actions/Settings/Subscription';
import { getSellerInfo } from '../../../../actions/Settings';

/* Assets */
import Setcard from '../../../../assets/images/4_Card_color_horizontal.svg';
import Stripe from '../../../../assets/images/powered_by_stripe.svg';

/* Styling */
import styles from './index.module.scss';
import 'react-multi-carousel/lib/styles.css';

/* Components */
import PageHeader from '../../../../components/PageHeader';
import Herobox from './Herobox';

/* Types */
import { Subscription } from '../../../../interfaces/Seller';
import FAQSection from './FaqSection';

/* Data */
import { DAILY_SUBSCRIPTION_PLANS } from '../../../../constants/Subscription/AiStock';

interface SubscriptionProps {
  getSeller: () => void;
  profile: any;
  fetchSubscriptions: () => void;
  fetchSellerSubscription: () => void;
  setSellerSubscription: (data: any) => void;
  sellerSubscription: any;
  subscriptions: Subscription[];
  location: any;
  subscriptionType: string;
  match: any;
}

class SubscriptionPricing extends React.Component<SubscriptionProps> {
  state = {
    couponVal: '',
    promptCancelSubscription: false,
    pendingSubscription: false,
    pendingSubscriptionId: '',
    pendingSubscriptionName: '',
    pendingSubscriptionMode: '',
    mode: '',
    isMonthly: false,
  };

  componentDidMount() {
    const { getSeller, fetchSubscriptions, location, sellerSubscription } = this.props;

    // Show success message if success url param (user has signed up for a plan)
    // Then redirect to /synthesis
    // TODO: Change stripe success redirect url to /synthesis and handle there
    if (location.search) {
      const urlParams = queryString.parse(location.search);
      if (urlParams.success) {
        success(`You've signed up for a plan. Welcome!`);
        history.push('/synthesis');
        return;
      }
    }

    getSeller();
    fetchSubscriptions();

    this.setState({
      isMonthly: sellerSubscription.payment_mode === 'monthly' ? true : false,
    });
  }

  chooseSubscription(subscription: any, paymentMode: string) {
    const subscriptionId = this.props.sellerSubscription.subscription_id;
    if (isSubscriptionIdFreeTrial(subscriptionId)) {
      this.checkout(subscription, paymentMode);
    } else {
      this.setState({
        pendingSubscription: true,
        pendingSubscriptionId: subscription.id,
        pendingSubscriptionName: subscription.name,
        pendingSubscriptionMode: paymentMode,
      });
    }
  }

  // Change plan that user is subscribed to
  changeSubscription(subscriptionId: any, paymentMode: string) {
    const { profile, fetchSellerSubscription } = this.props;
    const bodyFormData = new FormData();
    bodyFormData.append('subscription_id', subscriptionId);
    bodyFormData.append('payment_mode', paymentMode);

    Axios.post(AppConfig.BASE_URL_API + `sellers/${profile.id}/subscription/update`, bodyFormData)
      .then(() => {
        // Re-fetch subscription to update UI
        fetchSellerSubscription();
        success(`You have changed your subscription`);
      })
      .catch(() => {
        error(`There was an error changing subscription`);
      });
  }

  checkout(subscription: Subscription, paymentMode: string) {
    localStorage.setItem('planType', convertPlanNameToKey(subscription.name));
    localStorage.setItem('paymentMode', paymentMode);
    history.push(`/subscription/payment`);
  }

  getNewPlan = (subscriptionDetails: { name: string; id: number }) => {
    if (DAILY_SUBSCRIPTION_PLANS.includes(subscriptionDetails.id)) {
      this.chooseSubscription(subscriptionDetails, 'daily');
      return;
    }

    const { isMonthly } = this.state;
    this.chooseSubscription(subscriptionDetails, isMonthly ? 'monthly' : 'yearly');
    return;
  };

  requestChangeSubscription = (name: string, id: number, mode: string) => {
    this.setState({
      pendingSubscription: true,
      pendingSubscriptionName: name,
      pendingSubscriptionId: id,
      mode: mode,
    });
  };

  render() {
    const { match, sellerSubscription } = this.props;

    const { pendingSubscription, pendingSubscriptionId, mode } = this.state;

    const isPaidSellerSubscription =
      sellerSubscription &&
      sellerSubscription.subscription_id &&
      !isSubscriptionIdFreeTrial(sellerSubscription.subscription_id);

    return (
      <>
        <PageHeader
          title={'Pricing Plans'}
          breadcrumb={[
            { content: 'Home', to: '/' },
            { content: 'Settings' },
            { content: 'Pricing' },
          ]}
          auth={match.params.auth}
        />

        <Confirm
          content={`Please confirm if you really want to switch to a new plan`}
          open={pendingSubscription ? true : false}
          onCancel={() => {
            this.setState({
              pendingSubscription: false,
              pendingSubscriptionId: '',
              pendingSubscriptionName: '',
              pendingSubscriptionMode: '',
            });
          }}
          onConfirm={() => {
            this.setState({
              pendingSubscription: false,
              pendingSubscriptionId: '',
              pendingSubscriptionName: '',
              pendingSubscriptionMode: '',
            });
            this.changeSubscription(pendingSubscriptionId, mode);
          }}
        />

        <main className={styles.subscriptionPage}>
          <section className={styles.subscriptionPageWrapper}>
            <button className={styles.goBackButton} onClick={() => history.goBack()}>
              <img src={LeftArrow} alt="left arrow" />
              Back to previous page
            </button>
            <div className={styles.planName}>
              <h2>Are you thinking to switch plan?</h2>
            </div>

            <div className={styles.planShortSummary}>
              <p>
                It is very easy, quick and secure. We'll prorate your new billing with current one.
              </p>
            </div>
            <Herobox
              isPaidSellerSubscription={isPaidSellerSubscription}
              requestChangeSubscription={this.requestChangeSubscription}
              sellerSubscription={sellerSubscription}
            />
            <FAQSection />
          </section>

          <section className={styles.paymentMeta}>
            <div className={styles.paymentMeta__images}>
              <img src={Setcard} alt="Different card payment options" />
              <img src={Stripe} alt="Protected by Stripe logo" />
            </div>
            <div className={styles.paymentMeta__text}>
              <p />
            </div>
          </section>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  profile: state.settings.profile,
  sellerSubscription: state.subscription.sellerSubscription,
  subscriptionType: state.subscription.subscriptionType,
});

const mapDispatchToProps = {
  getSeller: () => getSellerInfo(),
  fetchSubscriptions: () => fetchSubscriptions(),
  fetchSellerSubscription: () => fetchSellerSubscription(),
  setSellerSubscription: (data: any) => setSellerSubscription(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionPricing);

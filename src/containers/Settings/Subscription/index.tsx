import React from 'react';
import { Confirm } from 'semantic-ui-react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { v4 as uuid } from 'uuid';
import Axios from 'axios';
import _ from 'lodash';

import stripe from '../../../stripe';

/* Utils */
import { success, error } from '../../../utils/notifications';
import history from '../../../history';

/* Config */
import { AppConfig } from '../../../config';

/* Actions */
import {
  fetchSellerSubscription,
  fetchSubscriptions,
  redeemCoupon,
  setSellerSubscription,
} from '../../../actions/Settings/Subscription';
import { getSellerInfo } from '../../../actions/Settings';

/* Assets */
import Setcard from '../../../assets/images/4_Card_color_horizontal.svg';
import Stripe from '../../../assets/images/powered_by_stripe.svg';

/* Styling */
import styles from './index.module.scss';

/* Components */
import SubscriptionMessage from '../../../components/FreeTrialMessageDisplay';
import PageHeader from '../../../components/PageHeader';
import PricePlanToggleButton from '../../../components/PricePlanToggleButton';
import PricingInfoAlert from '../../../components/PricingInfoAlert';
import PricingPlansCard from '../../../components/PricingPlansCard';
import AllFeaturesTable from '../../../components/AllFeaturesTable';
import { isSubscriptionNotPaid } from '../../../utils/subscriptions';

/* Data */
import { plansAndProductsDetails } from './data/index';
import { generateHybridTable } from './data/tableData';

/* Types */
import { Subscription } from '../../../interfaces/Seller';

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
  subscriptionPlan: string;
  match: any;
  redeemCoupon: (value: any, id: any) => void;
}

class SubscriptionPricing extends React.Component<SubscriptionProps> {
  state = {
    couponVal: '',
    promptCancelSubscription: false,
    pendingSubscription: false,
    pendingSubscriptionId: '',
    pendingSubscriptionName: '',
    pendingSubscriptionMode: '',
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
    console.log(sellerSubscription.payment_mode);

    this.setState({
      isMonthly: sellerSubscription.payment_mode === 'monthly' ? true : false,
    });
  }

  chooseSubscription(subscription: any, paymentMode: string) {
    const { subscriptionType } = this.props;
    if (isSubscriptionNotPaid(subscriptionType)) {
      this.checkout(subscription.id, paymentMode);
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

  cancelSubscription() {
    const { profile, setSellerSubscription, fetchSellerSubscription } = this.props;

    Axios.post(AppConfig.BASE_URL_API + `sellers/${profile.id}/subscription/cancel`)
      .then(() => {
        setSellerSubscription(false);
        fetchSellerSubscription();
        success(`Your subscription has been cancelled`);
      })
      .catch(() => {
        error(`There was an error cancelling your subscription`);
      });
  }

  checkout(subscriptionId: any, paymentMode: string) {
    this.createCheckoutSession(subscriptionId, paymentMode)
      .then((checkoutSessionId: any) => {
        this.redirectToCheckout(checkoutSessionId);
      })
      .catch(() => {
        error(`There was an error redirecting you to Stripe`);
      });
  }

  createCheckoutSession(subscriptionId: any, paymentMode: string) {
    const { profile } = this.props;
    const bodyFormData = new FormData();
    bodyFormData.append('subscription_id', subscriptionId);
    bodyFormData.append('payment_mode', paymentMode);
    bodyFormData.append('email', profile.email);

    // Include affiliate referral
    const referral = this.getReferral();
    if (referral) {
      bodyFormData.append('referral', referral);
    }

    return Axios.post(
      AppConfig.BASE_URL_API + `sellers/${profile.id}/subscription/create-checkout-session`,
      bodyFormData
    ).then(response => {
      return response.data;
    });
  }

  redirectToCheckout(checkoutSessionId: any) {
    stripe
      .redirectToCheckout({
        sessionId: checkoutSessionId,
      })
      .then((result: any) => {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
        error(`There was an error: ${result.error.message}`);
      });
  }

  getReferral() {
    // @ts-ignore
    return typeof window.Rewardful !== 'undefined' && window.Rewardful.referral;
  }

  redeem() {
    const { couponVal } = this.state;
    const { profile, redeemCoupon } = this.props;
    redeemCoupon(couponVal, profile.id);
  }

  promptCancelSubscriptionPlan = () => {
    this.setState({ promptCancelSubscription: true });
  };

  getNewPlan(subscriptionDetails: any) {
    const { isMonthly } = this.state;
    this.chooseSubscription(subscriptionDetails, isMonthly ? 'monthly' : 'yearly');
  }

  render() {
    const { match, sellerSubscription, subscriptions, subscriptionType } = this.props;

    const {
      promptCancelSubscription,
      pendingSubscription,
      pendingSubscriptionId,
      pendingSubscriptionName,
      pendingSubscriptionMode,
      isMonthly,
    } = this.state;

    const infoAlertDetails = isMonthly
      ? plansAndProductsDetails.infoAlertMessage.monthly
      : plansAndProductsDetails.infoAlertMessage.yearly;

    // Find the subscribed subscription
    const subscribedSubscription = subscriptions
      ? subscriptions.filter(e => e.id === sellerSubscription.subscription_id)[0]
      : undefined;

    const nonEnterprisePlans = subscriptions && subscriptions.filter((plan: any) => plan.id !== 3);

    const getComparisionStats =
      nonEnterprisePlans &&
      nonEnterprisePlans.reduce((acc: any, plan: any) => {
        return {
          ...acc,
          [plan.name.toLocaleLowerCase()]: {
            productTracker: plan.track_limit,
            salesEstimateLimit: plan.sales_estimation_limit,
            profitFinder: plan.synthesis_limit,
            leadsTracker: plan.leads_track_limit,
            trackHistory: Math.round(plan.track_history_limit / 30),
          },
        };
      }, {});

    const comparisionTableData = generateHybridTable(getComparisionStats);

    return (
      <>
        <SubscriptionMessage page={'subscription'} />
        <PageHeader
          title={'Pricing Plans'}
          breadcrumb={[
            { content: 'Home', to: '/' },
            { content: 'Settings', to: '/settings' },
            { content: 'Pricing' },
          ]}
          auth={match.params.auth}
        />

        <Confirm
          content="Are you sure you want to cancel your subscription?"
          open={promptCancelSubscription}
          onCancel={() => {
            this.setState({ promptCancelSubscription: false });
          }}
          onConfirm={() => {
            this.setState({ promptCancelSubscription: false });
            this.cancelSubscription();
          }}
        />

        <Confirm
          content={`Would you like to change your plan to "${_.startCase(
            pendingSubscriptionMode
          )} ${pendingSubscriptionName}"`}
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

            this.changeSubscription(pendingSubscriptionId, pendingSubscriptionMode);
          }}
        />

        <main className={styles.subscriptionPage}>
          <section className={styles.subscriptionPageWrapper}>
            <div className={styles.planName}>
              <span />
              <h2>{plansAndProductsDetails.planName}</h2>
            </div>

            <div className={styles.planShortSummary}>
              <p>{plansAndProductsDetails.summary}</p>
            </div>

            <PricePlanToggleButton
              isMonthly={isMonthly}
              handleChange={() => this.setState({ isMonthly: !isMonthly })}
              className={styles.paymentModeToggle}
            />

            <PricingInfoAlert {...infoAlertDetails} background="#F2EFE4" />

            <section className={styles.pricingPlanCardsWrapper}>
              {plansAndProductsDetails.productsIncluded.map(product => {
                return (
                  <PricingPlansCard
                    key={uuid()}
                    subscriptionId={product.subscriptionId}
                    name={product.name}
                    desc={product.desc}
                    featureSubName={product.featureSubName}
                    featuresLists={product.featuresLists}
                    isMonthly={isMonthly}
                    subscribedSubscription={subscribedSubscription}
                    subscriptionType={subscriptionType}
                    promptCancelSubscription={this.promptCancelSubscriptionPlan.bind(this)}
                    changePlan={(subscriptionDetails: any) => this.getNewPlan(subscriptionDetails)}
                    sellerSubscription={sellerSubscription}
                    subscriptions={subscriptions}
                  />
                );
              })}
            </section>

            <section className={styles.allFeaturesSection}>
              {comparisionTableData.map((feature: any) => {
                return (
                  <AllFeaturesTable key={uuid()} header={feature.header} body={feature.body} />
                );
              })}
            </section>

            <section className={styles.paymentMeta}>
              <div className={styles.paymentMeta__images}>
                <img src={Setcard} alt="Different card payment options" />
                <img src={Stripe} alt="Protected by stripe logo" />
              </div>
              <div className={styles.paymentMeta__text}>
                <p>We offer 7-day money back guarantee.</p>
              </div>
            </section>
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
  subscriptions: state.subscription.subscriptions,
  subscriptionPlan: state.subscription.plan,
});

const mapDispatchToProps = {
  getSeller: () => getSellerInfo(),
  fetchSubscriptions: () => fetchSubscriptions(),
  fetchSellerSubscription: () => fetchSellerSubscription(),
  setSellerSubscription: (data: any) => setSellerSubscription(data),
  redeemCoupon: (value: any, id: any) => redeemCoupon(value, id),
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionPricing);

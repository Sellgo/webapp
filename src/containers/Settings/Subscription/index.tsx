import React from 'react';
import { Confirm, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import Axios from 'axios';
import _ from 'lodash';
import Carousel from 'react-multi-carousel';

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
import 'react-multi-carousel/lib/styles.css';

/* Components */

import PageHeader from '../../../components/PageHeader';

import PricingInfoAlert from '../../../components/PricingInfoAlert';

import { isSubscriptionNotPaid } from '../../../utils/subscriptions';

/* Types */
import { Subscription } from '../../../interfaces/Seller';
import PricingPlansSummary from '../../../components/PricingCardsSummary';
import { subscriptionPlans, SubscriptionPlan } from './data';
import { DAILY_SUBSCRIPTION_PLANS } from '../../../constants/Settings';
import FAQSection from './FaqSection';

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

    this.setState({
      isMonthly: sellerSubscription.payment_mode === 'monthly' ? true : false,
    });
  }

  chooseSubscription(subscription: any, paymentMode: string) {
    const { subscriptionType } = this.props;
    if (isSubscriptionNotPaid(subscriptionType)) {
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

  launchChurnflow() {
    history.push('/churnflow');
  }

  checkout(subscription: Subscription, paymentMode: string) {
    localStorage.setItem('planType', subscription.name.split(' ').join(''));
    localStorage.setItem('paymentMode', paymentMode);
    history.push(`/subscription/payment`);
  }

  createCheckoutSession(subscriptionId: any, paymentMode: string) {
    const { profile } = this.props;
    const bodyFormData = new FormData();
    bodyFormData.append('subscription_id', subscriptionId);
    bodyFormData.append('payment_mode', paymentMode);
    bodyFormData.append('email', profile.email);

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

  redeem() {
    const { couponVal } = this.state;
    const { profile, redeemCoupon } = this.props;
    redeemCoupon(couponVal, profile.id);
  }

  promptCancelSubscriptionPlan = () => {
    this.setState({ promptCancelSubscription: true });
  };

  getNewPlan = (subscriptionDetails: any) => {
    if (DAILY_SUBSCRIPTION_PLANS.includes(subscriptionDetails.id)) {
      this.chooseSubscription(subscriptionDetails, 'daily');
      return;
    }

    const { isMonthly } = this.state;
    this.chooseSubscription(subscriptionDetails, isMonthly ? 'monthly' : 'yearly');
    return;
  };

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

    // Find the subscribed subscription
    const subscribedSubscription = subscriptions
      ? subscriptions.find(e => e.id === sellerSubscription.subscription_id)
      : undefined;

    return (
      <>
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
            this.launchChurnflow();
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
              <h2>Sellgo Subscription Plans</h2>
            </div>

            <div className={styles.planShortSummary}>
              <p>Pay Less On Software, Invest More In Your Business.</p>
            </div>

            <PricingInfoAlert
              head="For new members register with Amazon Seller Central Account. Risk free 7-day money back guarantee."
              navigateLabel="Learn More"
              navigateTo=""
              background="#F2EFE4"
            />
          </section>

          <section className={styles.carouselWrapper}>
            <Carousel
              ssr
              partialVisbile
              deviceType={'desktop'}
              itemClass="image-item"
              responsive={{
                desktop: {
                  breakpoint: { max: 3000, min: 1024 },
                  items: 3,
                  paritialVisibilityGutter: 60,
                },
                tablet: {
                  breakpoint: { max: 1024, min: 464 },
                  items: 2,
                  paritialVisibilityGutter: 50,
                },
                mobile: {
                  breakpoint: { max: 464, min: 0 },
                  items: 1,
                  paritialVisibilityGutter: 30,
                },
              }}
              className={styles.carouselListWrappewr}
            >
              {subscriptionPlans.map((subscriptionPlan: SubscriptionPlan) => {
                const {
                  subscriptionId,
                  monthlyPrice,
                  annualPrice,
                  name,
                  isDailyPlan,
                } = subscriptionPlan;
                return (
                  <PricingPlansSummary
                    key={subscriptionId}
                    subscriptionId={subscriptionId}
                    name={name}
                    isMonthly={isMonthly}
                    monthlyPrice={monthlyPrice}
                    annualPrice={annualPrice}
                    isDailyPlan={isDailyPlan}
                    handleChange={() => this.setState({ isMonthly: !isMonthly })}
                    // seller subscriptions
                    subscribedSubscription={subscribedSubscription}
                    subscriptionType={subscriptionType}
                    sellerSubscription={sellerSubscription}
                    // subscription details
                    // action on subscriptions
                    promptCancelSubscription={this.promptCancelSubscriptionPlan.bind(this)}
                    changePlan={(subscriptionDetails: any) => this.getNewPlan(subscriptionDetails)}
                  />
                );
              })}
            </Carousel>
          </section>

          <p className={styles.comparisionLink}>
            More detail comparision
            <span>
              <Icon
                name="external"
                className={styles.externalLinkIcon}
                onClick={() => window.open('https://sellgo.com/pricing', '_target')}
              />
            </span>
          </p>

          <section className={styles.paymentMeta}>
            <div className={styles.paymentMeta__images}>
              <img src={Setcard} alt="Different card payment options" />
              <img src={Stripe} alt="Protected by stripe logo" />
            </div>
            <div className={styles.paymentMeta__text}>
              <p>We offer 7-day money back guarantee.</p>
            </div>
          </section>

          <FAQSection />
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

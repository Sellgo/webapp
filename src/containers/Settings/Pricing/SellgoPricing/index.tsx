import React from 'react';
import { Confirm } from 'semantic-ui-react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import Axios from 'axios';
import _ from 'lodash';

/* Utils */
import { success, error } from '../../../../utils/notifications';
import history from '../../../../history';
import { convertPlanNameToKey, isSubscriptionNotPaid } from '../../../../utils/subscriptions';

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
// import Setcard from '../../../../assets/images/4_Card_color_horizontal.svg';
// import Stripe from '../../../../assets/images/powered_by_stripe.svg';

/* Styling */
import styles from './index.module.scss';
import 'react-multi-carousel/lib/styles.css';

/* Components */
import PricingPlansCard from '../../../../components/PricingPlansCard';
import PageHeader from '../../../../components/PageHeader';
import ToggleButton from '../../../../components/ToggleButton';

/* Types */
import { Subscription } from '../../../../interfaces/Seller';
import FAQSection from './FaqSection';

/* Data */
import {
  DAILY_SUBSCRIPTION_PLANS,
  MONTHLY_AND_ANNUAL_PLANS,
} from '../../../../constants/Subscription/Sellgo';
import PricingComparison from './PricingComparison';
import MoreDetails from './MoreDetail';
import Testimonials from './Testimonials';
import BrandImages from './BrandImages';

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

  checkout(subscription: Subscription, paymentMode: string) {
    localStorage.setItem('planType', convertPlanNameToKey(subscription.name));
    localStorage.setItem('paymentMode', paymentMode);
    history.push(`/subscription/payment`);
  }

  getNewPlan = (subscriptionDetails: { name: string; id: number }, isUpgradingToYearly = false) => {
    if (DAILY_SUBSCRIPTION_PLANS.includes(subscriptionDetails.id)) {
      this.chooseSubscription(subscriptionDetails, 'daily');
      return;
    }
    if (isUpgradingToYearly) {
      this.chooseSubscription(subscriptionDetails, 'yearly');
      return;
    }
    const { isMonthly } = this.state;
    this.chooseSubscription(subscriptionDetails, isMonthly ? 'monthly' : 'yearly');
    return;
  };

  render() {
    const { match, sellerSubscription } = this.props;

    const {
      pendingSubscription,
      pendingSubscriptionId,
      pendingSubscriptionName,
      pendingSubscriptionMode,
      isMonthly,
    } = this.state;

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
          className={styles.confirmBtn}
          content={`Would you like to change your plan to "${_.startCase(
            pendingSubscriptionMode
          )} ${pendingSubscriptionName}"`}
          open={pendingSubscription ? true : false}
          confirmButton="Switch Plan"
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
              <h2>Sellgo simple pricing plan</h2>
            </div>

            <div className={styles.planShortSummary}>
              <p>
                Emails? Phones? Categories? Brands? Reviews? Inventories?
                <br />
                Access our updated and verified seller data to help you turn leads into customers.
              </p>
            </div>
            {/* <div> */}
            <ToggleButton
              isToggled={!isMonthly}
              handleChange={() => this.setState({ isMonthly: !isMonthly })}
              className={styles.paymentModeToggleButton}
              options={['Pay monthly', 'Pay annually']}
            />

            {/* <div className={styles.paymentToggleTextWrapper}>
                <Image width={25} height={21} src="/handPointIcon.svg" alt="handpointicon" />
                <p className={styles.paymentToggleText}>Up to 5 months free.</p>
              </div> */}
            {/* </div> */}
            <div className={styles.pricingPlansCardWrapper}>
              {MONTHLY_AND_ANNUAL_PLANS.map((product: any) => {
                return (
                  <PricingPlansCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    isNew={product.isNew}
                    monthlyPrice={product.monthlyPrice}
                    annualPrice={product.annualPrice}
                    desc={product.desc}
                    featureSubName={product.featureSubName}
                    featuresLists={product.featuresLists}
                    // Plan details
                    isMonthly={isMonthly}
                    changePlan={(
                      subscriptionDetails: { name: string; id: number },
                      isUpgradingToYearly = false
                    ) => this.getNewPlan(subscriptionDetails, isUpgradingToYearly)}
                    // seller details
                    sellerSubscription={sellerSubscription}
                  />
                );
              })}
            </div>
          </section>

          {/* <section className={styles.paymentMeta}>
            <div className={styles.paymentMeta__images}>
              <img src={Setcard} alt="Different card payment options" />
              <img src={Stripe} alt="Protected by stripe logo" />
            </div>
          </section> */}
          <MoreDetails />
          <PricingComparison planName={'Pricing & Plans'} />
          <Testimonials />
          <BrandImages />
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
});

const mapDispatchToProps = {
  getSeller: () => getSellerInfo(),
  fetchSubscriptions: () => fetchSubscriptions(),
  fetchSellerSubscription: () => fetchSellerSubscription(),
  setSellerSubscription: (data: any) => setSellerSubscription(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionPricing);

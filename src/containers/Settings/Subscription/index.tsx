import React from 'react';
import {
  Button,
  Divider,
  Header,
  Segment,
  Label,
  Card,
  CardContent,
  Input,
  Confirm,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import {
  fetchSellerSubscription,
  fetchSubscriptions,
} from '../../../actions/Settings/Subscription';
import { getSellerInfo } from '../../../actions/Settings';
import './subscription.css';
import PageHeader from '../../../components/PageHeader';
import { Subscription } from '../../../interfaces/Seller';
import Axios from 'axios';
import { AppConfig } from '../../../config';
import stripe from '../../../stripe';
import { success, error } from '../../../utils/notifications';

interface SubscriptionProps {
  getSeller: () => void;
  profile: any;
  fetchSubscriptions: () => void;
  fetchSellerSubscription: () => void;
  sellerSubscription: any;
  subscriptions: Subscription[];
  location: any;
}

class SubscriptionPricing extends React.Component<SubscriptionProps> {
  state = {
    couponVal: '',
    promptCancelSubscription: false,
    // Breaking these out into individual values instead of an object
    // because couldn't get Typescript to allow an undefined object :(
    pendingSubscription: false,
    pendingCoupon: '',
    pendingSubscriptionId: '',
    pendingSubscriptionName: '',
  };

  componentDidMount() {
    const { getSeller, fetchSubscriptions, fetchSellerSubscription, location } = this.props;

    // Show success message if success url param (user has signed up for a plan)
    if (location.search) {
      const urlParams = queryString.parse(location.search);
      if (urlParams.success) {
        success(`You've signed up for a plan. Welcome!`);
      }
    }

    getSeller();
    fetchSubscriptions();
  }

  chooseSubscription(subscription: any) {
    const { couponVal } = this.state;

    const { sellerSubscription } = this.props;
    // If user has subscription already then change to selected plan
    // TODO: We're setting state to render the <Confirm> component
    // but this would be much cleaner as a function call instead of
    // a component so we can specify callback logic right here.
    if (sellerSubscription) {
      this.setState({
        pendingSubscription: true,
        pendingSubscriptionId: subscription.id,
        pendingSubscriptionName: subscription.name,
      });
      // Otherwise we want to go to payment page
    } else if (couponVal) {
      this.setState({
        pendingSubscription: true,
        pendingCoupon: couponVal,
        pendingSubscriptionId: subscription.id,
        pendingSubscriptionName: subscription.name,
      });
    } else {
      this.checkout(subscription.id);
    }
  }

  createTrialSubscription(subscriptionId: any, couponVal: any) {
    const { profile, fetchSellerSubscription } = this.props;
    const bodyFormData = new FormData();
    bodyFormData.append('subscription_id', subscriptionId);
    bodyFormData.append('coupon', couponVal);

    Axios.post(
      AppConfig.BASE_URL_API + `sellers/${profile.id}/subscription/redeem-coupon`,
      bodyFormData
    )
      .then(response => {
        // Re-fetch subscription to update UI
        fetchSellerSubscription();
        success(`You are now subscribed for a trial period`);
      })
      .catch((err: any) => {
        //console.log('[createTrialSubscription] err', { err });
        error(`The coupon "${couponVal}" is not valid`);
        this.setState({ couponVal: '' });
      });
  }

  // Change plan that user is subscribed to
  changeSubscription(subscriptionId: any) {
    const { profile, fetchSellerSubscription } = this.props;
    const bodyFormData = new FormData();
    bodyFormData.append('subscription_id', subscriptionId);

    Axios.post(AppConfig.BASE_URL_API + `sellers/${profile.id}/subscription/update`, bodyFormData)
      .then(response => {
        // Re-fetch subscription to update UI
        fetchSellerSubscription();
        success(`You have changed your subscription`);
      })
      .catch((err: any) => {
        //console.log('[changeSubscription] err', err);
        error(`There was an error changing subscription`);
      });
  }

  cancelSubscription() {
    const { profile, fetchSellerSubscription } = this.props;

    Axios.post(AppConfig.BASE_URL_API + `sellers/${profile.id}/subscription/cancel`)
      .then(response => {
        // Re-fetch subscription to update UI
        fetchSellerSubscription();
        success(`Your subscription has been cancelled`);
      })
      .catch((err: any) => {
        //console.log('[cancelSubscription] err', { err });
        error(`There was an error cancelling your subscription`);
      });
  }

  checkout(subscriptionId: any) {
    this.createCheckoutSession(subscriptionId)
      .then((checkoutSessionId: any) => {
        this.redirectToCheckout(checkoutSessionId);
      })
      .catch((err: any) => {
        //console.log('[create-checkout-session] err', err);
        error(`There was an error creating your checkout session`);
      });
  }

  createCheckoutSession(subscriptionId: any) {
    const { profile } = this.props;
    const bodyFormData = new FormData();
    bodyFormData.append('subscription_id', subscriptionId);
    bodyFormData.append('email', profile.email);

    return Axios.post(
      AppConfig.BASE_URL_API + `sellers/${profile.id}/subscription/create-checkout-session`,
      bodyFormData
    ).then(response => {
      //console.log('[create-checkout-session] response', response);
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

  render() {
    const { subscriptions, sellerSubscription } = this.props;
    const {
      promptCancelSubscription,
      pendingSubscription,
      pendingCoupon,
      pendingSubscriptionId,
      pendingSubscriptionName,
    } = this.state;

    const subscribedSubscription = sellerSubscription
      ? subscriptions.filter(e => e.id === sellerSubscription.subscription_id)[0]
      : undefined;

    const header = subscribedSubscription
      ? `You have subscribed to "${subscribedSubscription.name}" Plan`
      : 'Choose the one that best fits you!';

    const subscriptionsSorted = subscriptions.sort((a, b) => (a.id > b.id ? 1 : -1));

    return (
      <>
        <PageHeader
          title={'Pricing Plans'}
          breadcrumb={[
            { content: 'Home', to: '/' },
            { content: 'Settings', to: '/settings' },
            { content: 'Pricing' },
          ]}
        />

        <Confirm
          content="Are you sure you want to cancel your subscription"
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
          content={`Use coupon ${pendingCoupon} for "${pendingSubscriptionName}"`}
          open={pendingSubscription && pendingCoupon ? true : false}
          onCancel={() => {
            this.setState({
              couponVal: '',
              pendingSubscription: false,
              pendingCoupon: '',
              pendingSubscriptionId: '',
              pendingSubscriptionName: '',
            });
          }}
          onConfirm={() => {
            this.setState({
              couponVal: '',
              pendingSubscription: false,
              pendingCoupon: '',
              pendingSubscriptionId: '',
              pendingSubscriptionName: '',
            });

            this.createTrialSubscription(pendingSubscriptionId, pendingCoupon);
          }}
        />

        <Confirm
          content={`Would you like to change your plan to "${pendingSubscriptionName}"`}
          open={pendingSubscription ? true : false}
          onCancel={() => {
            this.setState({
              pendingSubscription: false,
              pendingSubscriptionId: '',
              pendingSubscriptionName: '',
            });
          }}
          onConfirm={() => {
            this.setState({
              pendingSubscription: false,
              pendingSubscriptionId: '',
              pendingSubscriptionName: '',
            });

            this.changeSubscription(pendingSubscriptionId);
          }}
        />

        <Segment basic={true} className="subscription" style={{ textAlign: 'center' }}>
          <Header as="h2">{header}</Header>
          <Segment basic={true} padded="very">
            {subscriptionsSorted.map((subscription: Subscription, index: number) => {
              const isSubscribed =
                subscribedSubscription && subscribedSubscription.id === subscription.id;
              return (
                <Card
                  key={index}
                  style={{ display: 'inline-block', margin: '10px', verticalAlign: 'baseline' }}
                >
                  <CardContent>
                    <Label attached="top" size={'big'}>
                      {subscription.name} Plan
                    </Label>
                    {index === 2 ? (
                      <>
                        <Header size="huge" className="price">
                          Call Us
                        </Header>
                        <p>Call 1-800-SELLGO</p>
                      </>
                    ) : (
                      <>
                        <Header size="huge" className="price">
                          ${subscription.price}
                        </Header>
                        <p>Per user / month</p>
                      </>
                    )}

                    <Divider />
                    <div className="limit">
                      <Header as="h4">Unlimited Profit Finder</Header>
                      <Header as="h4">
                        {subscription.track_limit !== -1 ? subscription.track_limit : 'Unlimited'}{' '}
                        Product Tracker Limit
                      </Header>
                      {/* Spacer to make selected plan taller */}
                      {isSubscribed && <div style={{ height: '50px' }} />}
                    </div>
                    {isSubscribed && (
                      <>
                        <Button
                          basic={true}
                          style={{
                            borderRadius: 20,
                            background: 'rgb(66, 133, 244) !important',
                            fontWeight: 'bold',
                          }}
                          color="red"
                          onClick={() => this.setState({ promptCancelSubscription: true })}
                        >
                          CANCEL
                        </Button>
                      </>
                    )}
                    {(!subscribedSubscription || subscribedSubscription.id !== subscription.id) && (
                      <Button
                        basic={true}
                        style={{
                          borderRadius: 20,
                          background: 'rgb(66, 133, 244) !important',
                          fontWeight: 'bold',
                          // So carts are same height
                          // TODO: Use flexbox to do this
                          visibility: index === 2 ? 'hidden' : 'visible',
                        }}
                        color="blue"
                        onClick={() => this.chooseSubscription(subscription)}
                      >
                        {subscribedSubscription ? 'CHANGE PLAN' : 'SUBSCRIBE'}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}

            {!sellerSubscription && (
              <div style={{ marginTop: '15px' }}>
                Have a coupon?{' '}
                <Input
                  style={{ marginLeft: '10px' }}
                  value={this.state.couponVal}
                  onChange={e => this.setState({ couponVal: e.target.value })}
                  placeholder="Coupon"
                  type="text"
                />
              </div>
            )}
          </Segment>
        </Segment>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  profile: state.settings.profile,
  sellerSubscription: state.subscription.sellerSubscription,
  subscriptions: state.subscription.subscriptions,
});

const mapDispatchToProps = {
  getSeller: () => getSellerInfo(),
  fetchSubscriptions: () => fetchSubscriptions(),
  fetchSellerSubscription: () => fetchSellerSubscription(),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionPricing);

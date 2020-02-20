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
  setSellerSubscription,
} from '../../../actions/Settings/Subscription';
import { getSellerInfo } from '../../../actions/Settings';
import './subscription.css';
import PageHeader from '../../../components/PageHeader';
import { Subscription } from '../../../interfaces/Seller';
import Axios from 'axios';
import { AppConfig } from '../../../config';
import stripe from '../../../stripe';
import { success, error } from '../../../utils/notifications';
import history from '../../../history';

interface SubscriptionProps {
  getSeller: () => void;
  profile: any;
  fetchSubscriptions: () => void;
  fetchSellerSubscription: () => void;
  setSellerSubscription: (data: any) => void;
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
    pendingSubscriptionId: '',
    pendingSubscriptionName: '',
  };

  componentDidMount() {
    const { getSeller, fetchSubscriptions, location } = this.props;

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
  }

  chooseSubscription(subscription: any) {
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
    } else {
      this.checkout(subscription.id);
    }
  }

  // Change plan that user is subscribed to
  changeSubscription(subscriptionId: any) {
    const { profile, fetchSellerSubscription } = this.props;
    const bodyFormData = new FormData();
    bodyFormData.append('subscription_id', subscriptionId);

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
    const { profile, setSellerSubscription } = this.props;

    Axios.post(AppConfig.BASE_URL_API + `sellers/${profile.id}/subscription/cancel`)
      .then(() => {
        setSellerSubscription(false);
        success(`Your subscription has been cancelled`);
      })
      .catch(() => {
        error(`There was an error cancelling your subscription`);
      });
  }

  checkout(subscriptionId: any) {
    this.createCheckoutSession(subscriptionId)
      .then((checkoutSessionId: any) => {
        this.redirectToCheckout(checkoutSessionId);
      })
      .catch(() => {
        error(`There was an error redirecting you to Stripe`);
      });
  }

  createCheckoutSession(subscriptionId: any) {
    const { profile } = this.props;
    const bodyFormData = new FormData();
    bodyFormData.append('subscription_id', subscriptionId);
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

  redeemCoupon() {
    const { couponVal } = this.state;
    const { profile } = this.props;
    const bodyFormData = new FormData();

    if (couponVal) bodyFormData.append('coupon', couponVal);
    else {
      error('Coupon field is empty.');
      return;
    }

    Axios.post(
      AppConfig.BASE_URL_API + `sellers/${profile.id}/subscription/redeem-coupon`,
      bodyFormData
    )
      .then(response => {
        success(`${response.data.message}`);
      })
      .catch((err: any) => {
        error(`${err.response.data.message}`);
      });
  }

  render() {
    const { subscriptions, sellerSubscription } = this.props;
    const {
      promptCancelSubscription,
      pendingSubscription,
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
                        <p>Coming Soon</p>
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
                            width: '180px',
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
                          // TODO: Use flexbox to do this so that we don't have to
                          // render this to DOM and make hidden to maintain equal heights (hacky)
                          visibility: index === 2 ? 'hidden' : 'visible',
                          width: '180px',
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
                  style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '15px' }}
                  value={this.state.couponVal}
                  onChange={e => this.setState({ couponVal: e.target.value })}
                  onKeyPress={(e: KeyboardEvent) => {
                    if (e.key === 'Enter') this.redeemCoupon();
                  }}
                  placeholder="Coupon"
                  type="text"
                />
                <Button
                  basic={true}
                  style={{
                    borderRadius: 20,
                    background: 'rgb(66, 133, 244) !important',
                    fontWeight: 'bold',
                    width: '180px',
                  }}
                  color="grey"
                  onClick={() => this.redeemCoupon()}
                >
                  {'REDEEM'}
                </Button>
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
  setSellerSubscription: (data: any) => setSellerSubscription(data),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionPricing);

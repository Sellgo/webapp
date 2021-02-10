import React from 'react';
import {
  Button,
  Header,
  Segment,
  Card,
  Input,
  Confirm,
  Grid,
  Image,
  Table,
  Divider,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import {
  fetchSellerSubscription,
  fetchSubscriptions,
  redeemCoupon,
  setSellerSubscription,
} from '../../../actions/Settings/Subscription';
import { getSellerInfo } from '../../../actions/Settings';
import './subscription.scss';
import PageHeader from '../../../components/PageHeader';
import { Subscription } from '../../../interfaces/Seller';
import Axios from 'axios';
import { AppConfig } from '../../../config';
import stripe from '../../../stripe';
import { success, error } from '../../../utils/notifications';
import history from '../../../history';

import Setcard from '../../../assets/images/4_Card_color_horizontal.svg';
import Stripe from '../../../assets/images/powered_by_stripe.svg';
import { Link } from 'react-router-dom';
import SubscriptionMessage from '../../../components/FreeTrialMessageDisplay';
import {
  isSubscriptionFree,
  isSubscriptionIdBasic,
  isSubscriptionIdEnterprise,
  isSubscriptionIdPro,
  isSubscriptionNotPaid,
  isTrialExpired,
} from '../../../utils/subscriptions';
import _ from 'lodash';

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
    // Breaking these out into individual values instead of an object
    // because couldn't get Typescript to allow an undefined object :(
    pendingSubscription: false,
    pendingSubscriptionId: '',
    pendingSubscriptionName: '',
    pendingSubscriptionMode: '',
    isYearly: false,
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
      isYearly: sellerSubscription.payment_mode === 'yearly' ? true : false,
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

  render() {
    const {
      subscriptions,
      sellerSubscription,
      subscriptionType,
      subscriptionPlan,
      match,
    } = this.props;
    const {
      promptCancelSubscription,
      pendingSubscription,
      pendingSubscriptionId,
      pendingSubscriptionName,
      pendingSubscriptionMode,
      isYearly,
    } = this.state;
    console.log('SELLER_SUBSCRIPTION', sellerSubscription);
    const subscribedSubscription = sellerSubscription
      ? subscriptions.filter(e => e.id === sellerSubscription.subscription_id)[0]
      : undefined;

    const trackTitle = 'Unlimited Profit Finder';

    let subscriptionsSorted = _.cloneDeep(subscriptions).sort((a, b) => (a.id > b.id ? 1 : -1));
    if (subscriptionsSorted.length && subscriptionsSorted.length === 4) {
      const [basic, pro, enterprise, extension] = subscriptionsSorted;
      subscriptionsSorted = [extension, basic, pro, enterprise];
    }

    const plansDisplay = subscriptionsSorted.map((subscription: Subscription) => {
      const isSubscribed =
        subscribedSubscription &&
        subscribedSubscription.id === subscription.id &&
        (isYearly
          ? sellerSubscription.payment_mode === 'yearly'
          : sellerSubscription.payment_mode === 'monthly');
      const subscriptionId = Number(subscription.id);
      return (
        <Card
          key={subscription.id}
          className={`card-container ${isYearly ? 'yearly-card' : 'monthly-card'} ${isSubscribed &&
            'active-plan'} ${!isSubscribed &&
            (isSubscriptionIdBasic(subscriptionId)
              ? 'basic-value-content'
              : isSubscriptionIdPro(subscriptionId)
              ? 'best-value-content'
              : 'contact-us-content')}`}
        >
          <Card.Content className="card-container__header">
            <Card.Header>
              <Button
                className={`${isSubscriptionIdBasic(subscriptionId) &&
                  !isSubscribed &&
                  'best-value'}`}
                fluid
              >
                Best Value
              </Button>
            </Card.Header>
          </Card.Content>
          <Card.Content className="card-container__name">
            <Card.Header className={`${isSubscriptionIdPro(subscriptionId) && 'pro-plan'}`}>
              {subscription.name}
            </Card.Header>
            <Card.Meta>
              {trackTitle}
              <br />
              {isSubscriptionIdBasic(subscriptionId) || isSubscriptionIdPro(subscriptionId)
                ? subscription.track_limit + ' Product Tracker Limit'
                : 'More than 100,000 Product Tracker Limit'}
            </Card.Meta>
          </Card.Content>
          {isYearly && !isSubscriptionIdEnterprise(subscriptionId) && (
            <Card.Content className="card-container__discount-details">
              <p className="card-container__discount-details__slash">
                ${subscription.monthly_price * 12}
              </p>
              <p className="card-container__discount-details__save">
                Pay ${Math.round(subscription.yearly_price)}
              </p>
            </Card.Content>
          )}
          <Card.Content
            className={`card-container__details ${isSubscriptionIdEnterprise(subscriptionId) &&
              'contact-us'}`}
          >
            <Card.Header>
              <strong>$&nbsp;</strong>
              {isSubscriptionIdEnterprise(subscriptionId)
                ? 'Contact Us'
                : isYearly
                ? Number(subscription.yearly_price / 12).toFixed(2)
                : Math.trunc(Number(subscription.monthly_price))}
              <strong>&nbsp;/mo</strong>
            </Card.Header>
            <Card.Description>
              {!isSubscriptionIdEnterprise(subscriptionId) &&
                (isYearly ? 'Billed Annually' : 'Billed Monthly')}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {isSubscribed && (
              <Button
                onClick={() => this.setState({ promptCancelSubscription: true })}
                className={`basic-btn active-plan`}
                fluid
              >
                Cancel
              </Button>
            )}
            {!isSubscribed && (
              <Button
                onClick={() =>
                  this.chooseSubscription(subscription, isYearly ? 'yearly' : 'monthly')
                }
                className={`basic-btn`}
                fluid
              >
                {subscribedSubscription ? 'Change Plan' : 'Get Started'}
              </Button>
            )}

            {!subscribedSubscription &&
              isSubscriptionFree(subscriptionPlan) &&
              !isTrialExpired(sellerSubscription) && (
                <Link to="/settings/#amazon-mws" className="free-trial-btn">
                  <Button className="basic-btn" fluid>
                    Free Trial
                  </Button>
                </Link>
              )}

            <p className={Number(subscription.id) === 3 ? 'contact-us' : ''}>
              Contact Customer Service
              <a href="mailto: support@sellgo.com">{'support@sellgo.com'}</a>
            </p>
          </Card.Content>
        </Card>
      );
    });

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

        <Segment basic={true} className="subscription" style={{ textAlign: 'center' }}>
          <Grid className="pricing-container">
            <Grid.Row>
              <Header as="h1">Sellgo Pricing</Header>
              For new members register with Amazon Seller Central Account <br />
              Risk free 14-day money back guarantee
            </Grid.Row>

            <Grid.Row className="pricing-type flex-center">
              <div className="pricing-type__content">
                <Button
                  className={`pricing-type__content__monthly-btn ${!isYearly && 'primary active'}`}
                  onClick={() => {
                    this.setState({ isYearly: false });
                  }}
                >
                  Monthly
                </Button>
                <Button
                  className={`pricing-type__content__yearly-btn ${isYearly && 'primary active'}`}
                  onClick={() => {
                    this.setState({ isYearly: true });
                  }}
                >
                  Yearly
                </Button>
                <div className="pricing-type__content__circle" />
              </div>
            </Grid.Row>
            <Grid.Row className="pricing-content flex-center">{plansDisplay}</Grid.Row>
            {isSubscriptionNotPaid(subscriptionType) && (
              <div className="coupon-container" style={{ marginTop: '15px' }}>
                <Header as="h4">Have a coupon?</Header>
                <Grid className="field-container">
                  <Input
                    style={{
                      marginLeft: '10px',
                      marginRight: '10px',
                      marginBottom: '15px',
                    }}
                    value={this.state.couponVal}
                    onChange={e => this.setState({ couponVal: e.target.value })}
                    onKeyPress={(e: KeyboardEvent) => {
                      if (e.key === 'Enter') this.redeem();
                    }}
                    placeholder="Enter Coupon Here"
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
                    onClick={() => this.redeem()}
                  >
                    {'Redeem'}
                  </Button>
                </Grid>
              </div>
            )}
            <Grid.Row className="setcard-container">
              <Image src={Setcard} />
              <Image src={Stripe} />
            </Grid.Row>
            <Grid.Row className="offer-footer">We offer 14-day money back guarantee.</Grid.Row>
            <Divider />
          </Grid>
          <Grid className="plans-table-container">
            <div className="plans-table-container__wrapper">
              <Grid.Row className="plans-table-container__wrapper__title">
                <p>Compare Plans</p>{' '}
              </Grid.Row>
              <Table striped className="plans-table-container__wrapper__table">
                <Table.Header className="plans-table-container__wrapper__table__header">
                  <Table.Row>
                    <Table.HeaderCell></Table.HeaderCell>
                    {_.map(subscriptionsSorted, (data, index) => {
                      return <Table.HeaderCell key={index}>{data.name}</Table.HeaderCell>;
                    })}
                  </Table.Row>
                </Table.Header>

                <Table.Body className="plans-table-container__wrapper__table__body">
                  <Table.Row>
                    <Table.Cell>Find Profitable Products</Table.Cell>
                    <Table.Cell>
                      <p>
                        <i className="fa fa-check" />
                      </p>
                    </Table.Cell>
                    <Table.Cell>
                      <p>
                        <i className="fa fa-check" />
                      </p>
                    </Table.Cell>
                    <Table.Cell>
                      <p>
                        <i className="fa fa-check" />
                      </p>
                    </Table.Cell>
                    <Table.Cell>
                      <p>
                        <i className="fa fa-check" />
                      </p>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Search Management</Table.Cell>
                    <Table.Cell>
                      <p>
                        <i className="fa fa-check" />
                      </p>
                    </Table.Cell>
                    <Table.Cell>
                      <p>
                        <i className="fa fa-check" />
                      </p>
                    </Table.Cell>
                    <Table.Cell>
                      <p>
                        <i className="fa fa-check" />
                      </p>
                    </Table.Cell>
                    <Table.Cell>
                      <p>
                        <i className="fa fa-check" />
                      </p>
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>Filter and Sort</Table.Cell>
                    <Table.Cell>
                      <p>
                        <i className="fa fa-check" />
                      </p>
                    </Table.Cell>
                    <Table.Cell>
                      <p>
                        <i className="fa fa-check" />
                      </p>
                    </Table.Cell>
                    <Table.Cell>
                      <p>
                        <i className="fa fa-check" />
                      </p>
                    </Table.Cell>
                    <Table.Cell>
                      <p>
                        <i className="fa fa-check" />
                      </p>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Daily Inventory Tracking</Table.Cell>
                    <Table.Cell>
                      <p>
                        <i className="fa fa-check" />
                      </p>
                    </Table.Cell>
                    <Table.Cell>
                      <p>
                        <i className="fa fa-check" />
                      </p>
                    </Table.Cell>
                    <Table.Cell>
                      <p>
                        <i className="fa fa-check" />
                      </p>
                    </Table.Cell>
                    <Table.Cell>
                      <p>
                        <i className="fa fa-check" />
                      </p>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Maximum Monthly Uploads</Table.Cell>
                    <Table.Cell>
                      <p>Limited</p>
                    </Table.Cell>
                    <Table.Cell>
                      <p>Unlimited</p>
                    </Table.Cell>
                    <Table.Cell>
                      <p>Unlimited</p>
                    </Table.Cell>
                    <Table.Cell>
                      <p>Unlimited</p>
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>Product Tracking</Table.Cell>
                    {_.map(subscriptionsSorted, (data, index) => {
                      if (data.name !== 'Enterprise') {
                        return (
                          <Table.Cell key={index}>
                            <p>{data.track_limit}</p>
                          </Table.Cell>
                        );
                      } else {
                        return (
                          <Table.Cell key={index}>
                            <p>Inquiry based</p>
                          </Table.Cell>
                        );
                      }
                    })}
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Leads Tracker</Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell>
                      <p>Inquiry based</p>
                    </Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
          </Grid>
        </Segment>
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

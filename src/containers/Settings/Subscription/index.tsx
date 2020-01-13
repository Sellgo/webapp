import React from 'react';
import { Button, Divider, Header, Segment, Label, Card, CardContent } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {
  fetchSellerSubscription,
  fetchSubscriptions,
} from '../../../actions/Settings/Subscription';
import './subscription.scss';
import PageHeader from '../../../components/PageHeader';
import Checkout from './Checkout';
import { Subscription } from '../../../interfaces/Seller';

interface SubscriptionProps {
  fetchSubscriptions: () => void;
  fetchSellerSubscription: () => void;
  sellerSubscription: any;
  subscriptions: Subscription[];
}

class SubscriptionPricing extends React.Component<SubscriptionProps> {
  componentDidMount() {
    const { fetchSubscriptions, fetchSellerSubscription } = this.props;
    fetchSubscriptions();
    fetchSellerSubscription();
  }

  render() {
    const { subscriptions, sellerSubscription } = this.props;

    const subscribedSubscription = sellerSubscription
      ? subscriptions.filter(e => e.id === sellerSubscription.subscription_id)[0]
      : undefined;
    const header = subscribedSubscription
      ? `You have subscribed to "${subscribedSubscription.name}" Plan`
      : 'Choose the one that best fits you!';

    return (
      <>
        <PageHeader
          title={'Pricing Plans'}
          breadcrumb={[
            { content: 'Home', to: '/' },
            { content: 'Settings', to: '/settings' },
            { content: 'Pricing' },
          ]}
          //callToAction={<CallToAction />}
        />
        <Segment basic={true} className="subscription" style={{ textAlign: 'center' }}>
          <Header as="h2">{header}</Header>
          <Segment basic={true} padded="very">
            {subscriptions.map((subscription: Subscription, index: number) => (
              <Card
                key={index}
                style={{ display: 'inline-block', margin: '10px', verticalAlign: 'baseline' }}
              >
                <CardContent>
                  <Label attached="top" size={'big'}>
                    {subscription.name} Plan
                  </Label>
                  <Header size="huge" className="price">
                    $X{/* ${subscription.price} */}
                  </Header>
                  <p>Per user / month</p>
                  <Divider />
                  <div className="limit">
                    <Header as="h4">
                      {subscription.synthesis_limit !== -1
                        ? subscription.synthesis_limit
                        : 'unlimited'}{' '}
                      syn limit
                    </Header>
                    <Header as="h4">
                      {subscription.track_limit !== -1 ? subscription.track_limit : 'unlimited'}{' '}
                      track limit
                    </Header>
                    {subscribedSubscription ? (
                      subscribedSubscription.id === subscription.id ? (
                        <Header as="h4">
                          Valid Untill : {new Date(sellerSubscription.expiry_date).toDateString()}
                        </Header>
                      ) : (
                        ''
                      )
                    ) : (
                      ''
                    )}
                  </div>
                  <Checkout subscription={subscription}>
                    <Button
                      basic={true}
                      style={{
                        borderRadius: 20,
                        background: 'rgb(66, 133, 244) !important',
                        fontWeight: 'bold',
                      }}
                      color="blue"
                    >
                      {subscribedSubscription
                        ? subscribedSubscription.id === subscription.id
                          ? 'EXTEND PLAN'
                          : 'CHANGE PLAN'
                        : 'SUBSCRIBE'}
                    </Button>
                  </Checkout>
                </CardContent>
              </Card>
            ))}
          </Segment>
        </Segment>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  sellerSubscription: state.subscription.sellerSubscription,
  subscriptions: state.subscription.subscriptions,
});

const mapDispatchToProps = {
  fetchSubscriptions: () => fetchSubscriptions(),
  fetchSellerSubscription: () => fetchSellerSubscription(),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionPricing);

import React from 'react';
import {
  Button,
  Container,
  Divider,
  Header,
  Segment,
  Label,
  Card,
  CardContent,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import MesssageComponent from '../../../components/MessageComponent';
import { Modals } from '../../../components/Modals';
import buttonStyle from '../../../components/StyleComponent/StyleComponent';
import { Link } from 'react-router-dom';
import { getSellerSubscription, getSubscriptions } from '../../../actions/Settings/Subscription';
import './subscription.css';
import Auth from '../../../components/Auth/Auth';
import PageHeader from '../../../components/PageHeader';
import Checkout from './Checkout';
import { Subscription } from '../../../interfaces/Seller';

interface State {
  isOpen: boolean;
}

interface SubscriptionProps {
  getSubscriptions: () => void;
  getSellerSubscription: () => void;
  sellerSubscription: any;
  subscriptions: Subscription[];
  isUpdate: boolean;
  match: { params: { auth: Auth } };
}

class SubscriptionPricing extends React.Component<SubscriptionProps, State> {
  state = {
    isOpen: false,
  };
  message = {
    title: 'Payment Successful',
    message: 'Thank you for the Payment',
    description: 'You have successfully subscribed to the plan.',
    description2: '',
    to: '/settings/subscription',
    button_text: 'Ok',
    icon: 'check circle',
    color: '#0E6FCF',
  };
  componentDidMount() {
    this.props.getSubscriptions();
    this.props.getSellerSubscription();
  }
  componentWillReceiveProps(props: any) {
    if (props.isUpdate) {
      this.handleModel();
    }
    if (props.isUpdate === false) {
      this.message.title = 'Payment Failed';
      this.message.message = 'Please try again';
      this.message.description =
        'There might be an issue with the payment or you have entered incorrect Card details';
      this.message.to = '/settings/subscription';
      this.handleModel();
    }
  }
  handleModel = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  };

  render() {
    const { isOpen } = this.state;
    const sellerSubscription = this.props.sellerSubscription;

    const subscribedSubscription = sellerSubscription
      ? this.props.subscriptions.filter(e => e.id === sellerSubscription.subscription_id)[0]
      : undefined;
    const header = subscribedSubscription
      ? `You have subscribed to ${subscribedSubscription.name} Plan`
      : 'Choose the one that best fits you!';

    return (
      <>
        <PageHeader title="Subscription" />
        <Segment basic={true} className="subscription" style={{ textAlign: 'center' }}>
          <Header as="h2">{header}</Header>
          <Divider />
          <Segment basic={true} padded="very">
            {this.props.subscriptions.map((subscription: Subscription, index: number) => (
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
        <Modals title="" size="large" open={isOpen} close={this.handleModel} bCloseIcon={true}>
          <Container textAlign="center">
            <MesssageComponent message={this.message} isModal={true} />
            <Segment textAlign="center" basic={true}>
              <Button
                style={buttonStyle}
                content="Ok"
                onClick={this.handleModel}
                as={Link}
                to={this.message.to}
              />
            </Segment>
          </Container>
        </Modals>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  sellerSubscription: state.subscription.sellerSubscription,
  subscriptions: state.subscription.subscriptions,
  isUpdate: state.subscription.success,
});

const mapDispatchToProps = {
  getSubscriptions: () => getSubscriptions(),
  getSellerSubscription: () => getSellerSubscription(),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionPricing);

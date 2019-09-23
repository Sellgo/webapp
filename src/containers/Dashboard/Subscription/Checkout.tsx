import * as React from 'react';
import StripeCheckout from 'react-stripe-checkout';

import { connect } from 'react-redux';
import { AppConfig } from '../../../config';
import { updateSellerSubscription, Subscription } from '../../../actions/Settings/Subscription';

interface State {}

interface Props {
  updateSellerSubscription(subscription: Subscription, data: any): () => void;
  subscription: Subscription;
}

class Checkout extends React.Component<Props, State> {
  handleToken = (token: any) => {
    const subscription = this.props.subscription;
    this.props.updateSellerSubscription(subscription, token.id);
  };
  render() {
    return (
      <StripeCheckout
        name="Sellgo"
        description="Complete Purchase"
        amount={100 * this.props.subscription.price}
        token={token => this.handleToken(token)}
        stripeKey={AppConfig.STRIPE_API_KEY}
        image={'/images/sellgo_stripe_logo.png'}
        currency="USD"
      >
        {this.props.children || <span {...this.props}>PURCHASE</span>}
      </StripeCheckout>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateSellerSubscription: (sub: Subscription, data: any) =>
      dispatch(updateSellerSubscription(sub, data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);

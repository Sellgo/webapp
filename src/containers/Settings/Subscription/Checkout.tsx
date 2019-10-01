import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { AppConfig } from '../../../config';
import { updateSellerSubscription } from '../../../actions/Settings/Subscription';
import { Subscription } from '../../../interfaces/Seller';

interface CheckoutProps {
  updateSellerSubscription: (subscription: Subscription, data: any) => void;
  subscription: Subscription;
}

class Checkout extends React.Component<CheckoutProps> {
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

const mapDispatchToProps = {
  updateSellerSubscription: (sub: Subscription, data: any) => updateSellerSubscription(sub, data),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);

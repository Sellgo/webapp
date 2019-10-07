import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { AppConfig } from '../../../config';
import { updateSellerSubscription } from '../../../actions/Settings/Subscription';
import { Subscription } from '../../../interfaces/Seller';

interface CheckoutProps {
  updateSellerSubscription: (subscription: Subscription, tokenID: any) => void;
  subscription: Subscription;
}

class Checkout extends React.Component<CheckoutProps> {
  handleToken = (token: any) => {
    const { subscription, updateSellerSubscription } = this.props;
    updateSellerSubscription(subscription, token.id);
  };
  render() {
    const { subscription, children } = this.props;
    return (
      <StripeCheckout
        name="Sellgo"
        description="Complete Purchase"
        amount={100 * subscription.price}
        token={token => this.handleToken(token)}
        stripeKey={AppConfig.STRIPE_API_KEY}
        image={'/images/sellgo_stripe_logo.png'}
        currency="USD"
      >
        {children || <span {...this.props}>PURCHASE</span>}
      </StripeCheckout>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {
  updateSellerSubscription: (sub: Subscription, tokenID: any) =>
    updateSellerSubscription(sub, tokenID),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);

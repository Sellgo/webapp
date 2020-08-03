import React from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Form, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { createSubscription } from '../../../actions/Settings/Subscription';
import { useInput } from '../../../hooks/useInput';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#3b4557',
      fontFamily: "'Work Sans', sans-serif",
      fontSmoothing: 'antialiased',
      fontSize: '21px',
      '::placeholder': {
        color: '#98AECA',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

interface MyProps {
  sellerSubscription: any;
}
function CheckoutForm(props: MyProps) {
  const stripe: any = useStripe();
  const elements = useElements();

  const { value: name, bind: bindName } = useInput('');
  const { value: address, bind: bindAddress } = useInput('');
  const { value: city, bind: bindCity } = useInput('');
  const { value: stateAddress, bind: bindStateAddress } = useInput('');
  const { value: zipCode, bind: bindZipCode } = useInput('');
  const { value: country, bind: bindCountry } = useInput('');
  const handleSubmit = async (event: any) => {
    console.log('THIS: ', name, address, city, stateAddress, zipCode, country);
    // const { name, address, city, stateAddress, zipCode, country } = state;
    // Block native form submission.
    event.preventDefault();
    const { sellerSubscription } = props;
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const cardElement = elements.getElement(CardNumberElement);
    // If a previous payment was attempted, get the latest invoice
    const latestInvoicePaymentIntentStatus = localStorage.getItem(
      'latestInvoicePaymentIntentStatus'
    );

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: name,
        address: {
          line1: address,
          city: city,
          country: country,
          state: stateAddress,
          postal_code: zipCode,
        },
      },
    });

    if (error) {
      console.log('[createPaymentMethod error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      const paymentMethodId = paymentMethod.id;
      if (latestInvoicePaymentIntentStatus === 'requires_payment_method') {
        // Update the payment method and retry invoice payment
        // const invoiceId = localStorage.getItem('latestInvoiceId');
        // retryInvoiceWithNewPaymentMethod({
        //   customerId,
        //   paymentMethodId,
        //   invoiceId,
        //   priceId,
        // });
      } else {
        const data = {
          subscription_id: sellerSubscription.subscription_id,
          payment_method_id: paymentMethodId,
        };
        createSubscription(data);
      }
    }
  };

  return (
    <>
      <Header className="payment-container__title" as="h2">
        Secure Credit Card Payment
      </Header>
      <span className="payment-container__subtitle">14-days money back guarantee.</span>
      <Form onSubmit={handleSubmit} className="payment-container__stripe-checkout-form">
        <Form.Field className="payment-container__stripe-checkout-form__card-number-field">
          <label htmlFor="CardNumber">Credit Card Number</label>
          <CardNumberElement id="CardNumber" options={CARD_ELEMENT_OPTIONS} />
        </Form.Field>
        <Form.Group className="checkout-form__group-1">
          <Form.Input
            className="payment-container__stripe-checkout-form__group-1__card-name"
            size="huge"
            label="FirstName"
            type="text"
            placeholder="Name on Card"
            {...bindName}
          />
          <Form.Field className="payment-container__stripe-checkout-form__group-1__card-exp-field">
            <label htmlFor="expiry">Expiry Date</label>

            <CardExpiryElement id="expiry" options={CARD_ELEMENT_OPTIONS} />
          </Form.Field>

          <Form.Field className="payment-container__stripe-checkout-form__group-1__card-cvc-field">
            <label htmlFor="cvc">CVC</label>
            <CardCvcElement id="cvc" options={CARD_ELEMENT_OPTIONS} />
          </Form.Field>
        </Form.Group>

        <Header className="payment-container__stripe-checkout-form__billing_title" as="h2">
          Billing Address
        </Header>
        <Form.Input
          className="payment-container__stripe-checkout-form__address"
          size="huge"
          label="Address"
          type="text"
          placeholder="Address"
          {...bindAddress}
        />
        <Form.Group className="payment-container__stripe-checkout-form__group-2">
          <Form.Input
            className="payment-container__stripe-checkout-form__group-2__city"
            size="huge"
            label="City"
            type="text"
            placeholder="City"
            {...bindCity}
          />
          <Form.Input
            className="payment-container__stripe-checkout-form__group-2__state"
            size="huge"
            label="State"
            type="text"
            placeholder="eg. California"
            {...bindStateAddress}
          />
        </Form.Group>
        <Form.Group className="payment-container__stripe-checkout-form__group-3">
          <Form.Input
            className="payment-container__stripe-checkout-form__group-3__country"
            size="huge"
            label="Country or Region"
            type="text"
            placeholder="Country"
            {...bindCountry}
          />
          <Form.Input
            className="payment-container__stripe-checkout-form__group-3__zipcode"
            size="huge"
            label="Zipcode"
            type="text"
            placeholder="eg. 97201"
            {...bindZipCode}
          />
        </Form.Group>

        <Form.Group className="payment-container__stripe-checkout-form__buttons">
          <Link
            to="/subscription"
            className="payment-container__stripe-checkout-form__buttons__back"
          >
            <Button size="huge" basic>
              Back
            </Button>
          </Link>
          <Form.Field
            disabled={!stripe}
            size="huge"
            className="payment-container__stripe-checkout-form__buttons__register"
            control={Button}
            primary={true}
            value="Submit"
          >
            Complete Payment
          </Form.Field>
        </Form.Group>
      </Form>
    </>
  );
}

const mapStateToProps = (state: {}) => ({
  sellerSubscription: get(state, 'subscription.sellerSubscription'),
});

export default connect(mapStateToProps)(CheckoutForm);

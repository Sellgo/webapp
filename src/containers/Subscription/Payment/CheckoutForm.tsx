import React from 'react';
import {
  ElementsConsumer,
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import { error, success } from '../../../utils/notifications';
import { Form, Header } from 'semantic-ui-react';

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
class CheckoutForm extends React.Component<any> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    };
  }
  handleSubmit = async (event: Event) => {
    // Block native form submission.
    event.preventDefault();

    const { stripe, elements } = this.props;

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmCardPayment('{CLIENT_SECRET}', {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Jenny Rosen',
        },
      },
    });

    if (result.error) {
      error(result.error);
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      success('The payment has been processed!');
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        success('The payment succeeded!');
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  render() {
    return (
      <>
        <Header className="payment-container__title" as="h2">
          Secure Credit Card Payment
        </Header>
        <span className="payment-container__subtitle">14-days money back guarantee.</span>
        <Form
          onSubmit={() => this.handleSubmit}
          className="payment-container__stripe-checkout-form"
        >
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
              onChange={event => {
                this.setState({ name: event.target.value });
              }}
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

          <button disabled={!this.props.stripe}>Complete Payment</button>
        </Form>
      </>
    );
  }
}

export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => <CheckoutForm stripe={stripe} elements={elements} />}
    </ElementsConsumer>
  );
}

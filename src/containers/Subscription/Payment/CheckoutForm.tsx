import React from 'react';
import {
  ElementsConsumer,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import { error, success } from '../../../utils/notifications';
import { Form, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AppConfig } from '../../../config';

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
  stripe: any;
  elements: any;
}
interface MyState {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
class CheckoutForm extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
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
  handleSubmit = (event: any) => {
    // Block native form submission.
    event.preventDefault();

    const { stripe, elements } = this.props;
    const { name, address, city, state, zipCode, country } = this.state;
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const cardElement = elements.getElement(CardNumberElement);

    const result = stripe.confirmCardPayment(AppConfig.STRIPE_API_KEY, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: name,
          address: address,
          city: city,
          country: country,
          state: state,
          postal_code: zipCode,
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
        <Form onSubmit={this.handleSubmit} className="payment-container__stripe-checkout-form">
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

          <Header className="payment-container__stripe-checkout-form__billing_title" as="h2">
            Billing Address
          </Header>
          <Form.Input
            className="payment-container__stripe-checkout-form__address"
            size="huge"
            label="Address"
            type="text"
            placeholder="Address"
            onChange={event => {
              this.setState({ address: event.target.value });
            }}
          />
          <Form.Group className="payment-container__stripe-checkout-form__group-2">
            <Form.Input
              className="payment-container__stripe-checkout-form__group-2__city"
              size="huge"
              label="City"
              type="text"
              placeholder="City"
              onChange={event => {
                this.setState({ city: event.target.value });
              }}
            />
            <Form.Input
              className="payment-container__stripe-checkout-form__group-2__state"
              size="huge"
              label="State"
              type="text"
              placeholder="eg. California"
              onChange={event => {
                this.setState({ state: event.target.value });
              }}
            />
          </Form.Group>
          <Form.Group className="payment-container__stripe-checkout-form__group-3">
            <Form.Input
              className="payment-container__stripe-checkout-form__group-3__country"
              size="huge"
              label="Country or Region"
              type="text"
              placeholder="Country"
              onChange={event => {
                this.setState({ country: event.target.value });
              }}
            />
            <Form.Input
              className="payment-container__stripe-checkout-form__group-3__zipcode"
              size="huge"
              label="Zipcode"
              type="text"
              placeholder="eg. 97201"
              onChange={event => {
                this.setState({ zipCode: event.target.value });
              }}
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
              disabled={!this.props.stripe}
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
}

export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => <CheckoutForm stripe={stripe} elements={elements} />}
    </ElementsConsumer>
  );
}

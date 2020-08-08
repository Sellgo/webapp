import React, { useState } from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Form, Header, Button, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { get } from 'lodash';
import {
  createSubscription,
  retryInvoiceWithNewPaymentMethod,
} from '../../../actions/Settings/Subscription';
import { useInput } from '../../../hooks/useInput';
import { defaultMarketplaces } from '../../../constants/Settings';
import cardIcons from '../../../assets/images/4_Card_color_horizontal.svg';
import stripeIcon from '../../../assets/images/powered_by_stripe.svg';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#3b4557',
      fontFamily: "'Work Sans', sans-serif",
      fontSmoothing: 'antialiased',
      fontSize: window.innerWidth < 1440 ? '18px' : '21px',
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
  accountType: string;
  createSubscriptionData: (data: any) => void;
  retryInvoiceW: (data: any) => void;
  handlePaymentError: (data: any) => void;
}
function CheckoutForm(props: MyProps) {
  const stripe: any = useStripe();
  const elements = useElements();

  const { value: name, bind: bindName } = useInput('');
  const { value: address, bind: bindAddress } = useInput('');
  const { value: city, bind: bindCity } = useInput('');
  const { value: stateAddress, bind: bindStateAddress } = useInput('');
  const { value: zipCode, bind: bindZipCode } = useInput('');
  const [selectedCountry, setSelectedCountry] = useState({
    key: 1,
    name: `US`,
    code: 'us',
    value: 'ATVPDKIKX0DER',
  });

  const handleCountry = (data: any) => {
    setSelectedCountry(data);
  };
  const trigger = <span className="country-label">{selectedCountry.name}</span>;

  const handleSubmit = async (event: any) => {
    // Block native form submission.
    event.preventDefault();
    const { accountType, createSubscriptionData, retryInvoiceW, handlePaymentError } = props;
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
          country: selectedCountry.code,
          state: stateAddress,
          postal_code: zipCode,
        },
      },
    });

    if (error) {
      handlePaymentError(error);
      console.log('[createPaymentMethod error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      const paymentMethodId = paymentMethod.id;
      if (latestInvoicePaymentIntentStatus === 'requires_payment_method') {
        // Update the payment method and retry invoice payment
        const invoiceId = localStorage.getItem('latestInvoiceId');
        retryInvoiceW({
          paymentMethodId,
          invoiceId,
        });
      } else {
        const data = {
          subscription_id: accountType === 'basic' ? 1 : 2,
          payment_method_id: paymentMethodId,
        };
        createSubscriptionData(data);
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
            label="Name on Card"
            type="text"
            placeholder="John Smith"
            {...bindName}
            required
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
          <Form.Field className="payment-container__stripe-checkout-form__group-3__country">
            <label htmlFor="Country">Country</label>
            <Dropdown id="Country" className="selection" openOnFocus trigger={trigger}>
              <Dropdown.Menu>
                {defaultMarketplaces.map((option, key) => {
                  return (
                    <Dropdown.Item
                      key={key}
                      text={option.name}
                      value={option.id}
                      onClick={() => {
                        handleCountry(option);
                      }}
                    />
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Field>
          <Form.Input
            className="payment-container__stripe-checkout-form__group-3__zipcode"
            size="huge"
            label="Zipcode"
            type="text"
            placeholder="eg. 97201"
            {...bindZipCode}
          />
        </Form.Group>
        <div className="payment-container__stripe-checkout-form__card-icons">
          <img
            className="payment-container__stripe-checkout-form__card-icons__four-cards"
            src={cardIcons}
            alt="cards"
          />
          <img
            className="payment-container__stripe-checkout-form__card-icons__stripe-card"
            src={stripeIcon}
            alt="powered by stripe"
          />
        </div>
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
const mapDispatchToProps = {
  createSubscriptionData: (data: any) => createSubscription(data),
  retryInvoiceW: (data: any) => retryInvoiceWithNewPaymentMethod(data),
};
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);

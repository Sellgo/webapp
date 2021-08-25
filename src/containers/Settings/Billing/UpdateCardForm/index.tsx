import React, { useState } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Form, Dropdown, Loader } from 'semantic-ui-react';
import Axios from 'axios';

/* Constants */
import { countryList } from '../../../../constants/Settings';
import { postalCode } from '../../../../constants/Validators';

/* App Config */
import { AppConfig } from '../../../../config';

/* Actions */
import { setStripeLoading } from '../../../../actions/Settings/Subscription';

/* Hooks */
import { useInput } from '../../../../hooks/useInput';

/* Assets */
import cardIcons from '../../../../assets/images/4_Card_color_horizontal.svg';
import stripeIcon from '../../../../assets/images/powered_by_stripe.svg';

/* Styling */
import styles from './index.module.scss';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#808080',
      fontFamily: "'Work Sans', sans-serif",
      fontSmoothing: 'antialiased',
      '::placeholder': {
        color: 'rgba(0,0,0,0.3)',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

interface MyProps {
  setStripeLoad: (data: boolean) => void;
  stripeLoading: boolean;
}

const UpdateCardForm = (props: MyProps) => {
  const stripe: any = useStripe();
  const elements = useElements();
  const sellerID = localStorage.getItem('userId');
  const { stripeLoading, setStripeLoad } = props;
  const { value: name, bind: bindName } = useInput('');
  const { value: address, bind: bindAddress } = useInput('');
  const { value: city, bind: bindCity } = useInput('');
  const { value: stateAddress, bind: bindStateAddress } = useInput('');
  const { value: zipCode, bind: bindZipCode } = useInput('');
  const [selectedCountry, setSelectedCountry] = useState({
    key: 1,
    name: `United States`,
    code: 'US',
    value: 'US',
  });
  const trigger = <span className="country-label">{selectedCountry.name}</span>;

  const handleCountry = (data: any) => {
    setSelectedCountry(data);
  };

  const handleSubmit = async (event: any) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    if (!name) {
      return;
    }

    if (!postalCode(zipCode, selectedCountry.code.split(','))) {
      return;
    }

    setStripeLoad(true);
    const cardElement = elements.getElement(CardNumberElement);

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
    const data = { payment_method_id: paymentMethod.id };

    if (error) {
      setStripeLoad(false);
      return;
    }

    // Axios.patch(`${AppConfig.BASE_URL_API}sellers/1000000001/billing/credit-card`, data).then(res =>
    Axios.patch(`${AppConfig.BASE_URL_API}sellers/${sellerID}/billing/credit-card`, data).then(() =>
      setStripeLoad(false)
    );
  };

  return (
    <div className={styles.checkoutContainer}>
      <h2>Secure Credit Card Information</h2>

      <form onSubmit={handleSubmit}>
        <Form.Field className={styles.formInput}>
          <label htmlFor="CardNumber">Credit Card Number</label>
          <CardNumberElement
            id="CardNumber"
            options={CARD_ELEMENT_OPTIONS}
            className={styles.stripeInput}
          />
        </Form.Field>

        <Form.Group className={styles.formGroup}>
          <Form.Input
            className={styles.formInput}
            size="huge"
            label="Name on Card"
            type="text"
            placeholder="John Smith"
            {...bindName}
          />

          <Form.Field className={`${styles.formInput} ${styles.formInput__expiry}`}>
            <label htmlFor="expiry">Expiry Date</label>
            <CardExpiryElement
              id="expiry"
              options={CARD_ELEMENT_OPTIONS}
              className={`${styles.stripeInput} ${styles.stripeInput__expiry}`}
            />
          </Form.Field>

          <Form.Field className={`${styles.formInput} ${styles.formInput__expiry}`}>
            <label htmlFor="cvc">CVC</label>
            <CardCvcElement
              id="cvc"
              options={CARD_ELEMENT_OPTIONS}
              className={`${styles.stripeInput} ${styles.stripeInput__cvv}`}
            />
          </Form.Field>
        </Form.Group>

        <h2>Billing Address</h2>
        <Form.Input
          className={styles.formInput}
          size="huge"
          label="Address"
          type="text"
          placeholder="Address"
          {...bindAddress}
        />

        <Form.Group className={styles.formGroup}>
          <Form.Input
            className={styles.formInput}
            size="huge"
            label="City"
            type="text"
            placeholder="City"
            {...bindCity}
          />
          <Form.Input
            className={styles.formInput}
            size="huge"
            label="State"
            type="text"
            placeholder="eg. California"
            {...bindStateAddress}
          />
        </Form.Group>

        <Form.Group className={styles.formGroup}>
          <Form.Field className={styles.formInput}>
            <label htmlFor="Country">Country</label>
            <Dropdown id="Country" className={styles.dropdown} openOnFocus trigger={trigger}>
              <Dropdown.Menu className={styles.dropdown__menu}>
                {countryList.map((option, key) => {
                  return (
                    <Dropdown.Item
                      key={key}
                      className={styles.dropdown__menuItem}
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
            className={styles.formInput}
            size="huge"
            label="Zipcode"
            type="text"
            placeholder="eg. 97201"
            {...bindZipCode}
          />
        </Form.Group>

        <div className={styles.paymentMeta}>
          <div className={styles.cardsWrapper}>
            <img className={styles.cardsWrapper__cards} src={cardIcons} alt="cards" />
            <img className={styles.cardsWrapper__stripe} src={stripeIcon} alt="powered by stripe" />
          </div>

          <div className={styles.paymentButtons}>
            <button
              onClick={() => {
                window.location.href = AppConfig.WEB_URL + '/pricing';
              }}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button
              disabled={!stripe || stripeLoading}
              type="submit"
              className={styles.completeButton}
            >
              Update Payment
              {stripeLoading && <Loader active inline size="mini" inverted />}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state: {}) => ({
  stripeLoading: get(state, 'subscription.stripeLoading'),
});

const mapDispatchToProps = {
  setStripeLoad: (data: boolean) => setStripeLoading(data),
};
export default connect(mapStateToProps, mapDispatchToProps)(UpdateCardForm);

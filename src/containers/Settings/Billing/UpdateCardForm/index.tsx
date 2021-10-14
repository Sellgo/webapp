import React, { useState } from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Form, Loader, Dimmer } from 'semantic-ui-react';
import Axios from 'axios';

/* App Config */
import { AppConfig } from '../../../../config';

/* Hooks */
import { useInput } from '../../../../hooks/useInput';

/* Assets */
import cardIcons from '../../../../assets/images/4_Card_color_horizontal.svg';
import stripeIcon from '../../../../assets/images/powered_by_stripe.svg';

/* Components */
import OrangeButton from '../../../../components/OrangeButton';

/* Styling */
import styles from './index.module.scss';

/* Notifications */
import { success } from '../../../../utils/notifications';

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
  handleCloseModal: () => void;
  fetchCreditCardInfo: () => void;
}

const UpdateCardForm = (props: MyProps) => {
  const { handleCloseModal, fetchCreditCardInfo } = props;
  const stripe: any = useStripe();
  const elements = useElements();
  const sellerID = localStorage.getItem('userId');

  const { value: name, bind: bindName } = useInput('');

  /* Local states */
  const [paymentError, setPaymentError] = useState<string>('');
  const [stripeLoading, setStripeLoad] = useState<boolean>(false);

  const handleSubmit = async (event: any) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    if (!name) {
      setPaymentError('Please fill out Name on Card field');
      return;
    }

    setStripeLoad(true);
    const cardElement = elements.getElement(CardNumberElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: name,
      },
    });
    const data = { payment_method_id: paymentMethod.id };

    if (error) {
      setStripeLoad(false);
      setPaymentError(error);
      return;
    }
    Axios.patch(`${AppConfig.BASE_URL_API}sellers/${sellerID}/billing/credit-card`, data)
      .then(res => {
        if (res.status === 200) {
          fetchCreditCardInfo();
          success('Payment successfully updated.');
          setStripeLoad(false);
          handleCloseModal();
        } else {
          setStripeLoad(false);
          setPaymentError('Failed to update payment. Please check card details.');
        }
      })
      .catch(() => {
        setStripeLoad(false);
        setPaymentError('Failed to update payment. Please check card details.');
      });
  };

  return (
    <div className={styles.checkoutContainer}>
      <h2>Adding Credit Card Payment</h2>

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

        <div className={styles.paymentMeta}>
          <div className={styles.cardsWrapper}>
            <img className={styles.cardsWrapper__cards} src={cardIcons} alt="cards" />
            <img className={styles.cardsWrapper__stripe} src={stripeIcon} alt="powered by stripe" />
          </div>

          <div className={styles.paymentButtons}>
            <div className={styles.buttonWrapper}>
              <OrangeButton
                type="white"
                size="medium"
                onClick={() => handleCloseModal()}
                className={styles.whiteButton}
              >
                Cancel
              </OrangeButton>
              {stripeLoading && <Dimmer blurring inverted active />}
            </div>
            <div className={styles.buttonWrapper}>
              <OrangeButton type="white" size="medium" className={styles.whiteButton}>
                Change Payment
              </OrangeButton>
              {stripeLoading && (
                <Dimmer blurring inverted active>
                  <Loader className={styles.loader} size="mini" />
                </Dimmer>
              )}
            </div>
          </div>
        </div>
      </form>
      {paymentError && (
        <div className={styles.paymentErrorMessage}>
          <p>{paymentError}</p>
        </div>
      )}
    </div>
  );
};

export default UpdateCardForm;

import React from 'react';
import './index.scss';
import { Container } from 'semantic-ui-react';
import queryString from 'query-string';
import StepsContent from '../StepsContent';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { success } from '../../../utils/notifications';
import history from '../../../history';
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

interface PaymentProps {
  location: any;
}
class Payment extends React.Component<PaymentProps> {
  componentDidMount() {
    const { location } = this.props;

    // Show success message if success url param (user has signed up for a plan)
    // Then redirect to /synthesis
    // TODO: Change stripe success redirect url to /synthesis and handle there
    if (location.search) {
      const urlParams = queryString.parse(location.search);
      if (urlParams.success) {
        success(`You've signed up for a plan. Welcome!`);
        history.push('/synthesis');
        return;
      }
    }
  }
  render() {
    return (
      <Container text className="payment-container">
        <StepsContent contentType={'payment'} />

        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </Container>
    );
  }
}

export default Payment;

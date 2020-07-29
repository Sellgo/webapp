import React from 'react';
import './index.scss';
import { Container, Grid, Image } from 'semantic-ui-react';
import queryString from 'query-string';
import StepsContent from '../StepsContent';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { success } from '../../../utils/notifications';
import history from '../../../history';
import Summary from '../Summary';
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

interface PaymentProps {
  location: any;
}
class Payment extends React.Component<PaymentProps> {
  state = {
    accountType: '',
  };
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

    this.setState(
      {
        accountType: window.location.search === '?type=basic' ? 'basic' : 'pro',
      },
      () => {
        localStorage.setItem('planType', this.state.accountType);
      }
    );
  }
  render() {
    const { accountType } = this.state;

    return (
      <Grid className="subscription-page" columns={2}>
        <Grid.Row>
          <Grid.Column width={5} className="subscription-page__logo-container">
            <div className="subscription-page__logo-container__image">
              <Image src="/images/sellgo_grey_logo.svg" wrapped={true} />
            </div>
          </Grid.Column>
          <Grid.Column width={11} className="subscription-page__content">
            <Summary planType={accountType} />
            <Container text className="payment-container">
              <StepsContent contentType={'payment'} />

              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Payment;

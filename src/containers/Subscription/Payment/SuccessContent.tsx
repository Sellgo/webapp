import React from 'react';
import './index.scss';
import { Header, Button, Form } from 'semantic-ui-react';
import { createBrowserHistory } from 'history';

export default function SuccessContent(props: any) {
  const { sellerSubscription } = props;
  const history = createBrowserHistory({ forceRefresh: true });
  return (
    <div className="payment-success-container">
      <Header as="h3">Payment Success</Header>
      {!sellerSubscription && <p>Please verify you email</p>}
      <p>We have sent you a receipt in your email</p>
      <Form.Field
        size="huge"
        className="payment-success-container__login"
        control={Button}
        primary={true}
        onClick={() => {
          localStorage.setItem('loginRedirectPath', '/');
          history.push('/');
        }}
      >
        Log in
      </Form.Field>
    </div>
  );
}

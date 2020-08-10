import React from 'react';
import './index.scss';
import { Header, Button, Form } from 'semantic-ui-react';
import Auth from '../../../components/Auth/Auth';

interface SuccessPaymentProps {
  auth: Auth;
}
export default function SuccessContent(props: SuccessPaymentProps) {
  const { auth } = props;
  return (
    <div className="payment-success-container">
      <Header as="h3">Payment Success</Header>
      <p>We have sent you a receipt in your email</p>
      <Form.Field
        size="huge"
        className="payment-success-container__login"
        control={Button}
        primary={true}
        onClick={() => {
          localStorage.setItem('loginRedirectPath', '/');
          auth.logout();
        }}
      >
        Log in
      </Form.Field>
    </div>
  );
}

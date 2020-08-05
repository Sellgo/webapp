import React from 'react';
import './index.scss';
import { Header, Button, Form } from 'semantic-ui-react';
import Auth from '../../../components/Auth/Auth';

interface PaidContentProps {
  auth: Auth;
}
export default function PaidContent(props: PaidContentProps) {
  const { auth } = props;
  return (
    <div className="paid-content-container">
      <Header as="h3">Your account already has an active plan</Header>
      <p>
        Contact us if you have any questions:{' '}
        <a href="mailto:support@sellgo.com">support@sellgo.com</a>
      </p>
      <Form.Field
        size="huge"
        className="paid-content-container__login"
        control={Button}
        primary={true}
        onClick={() => {
          auth.logout();
        }}
      >
        Log in
      </Form.Field>
    </div>
  );
}

import React from 'react';
import './index.scss';
import { Header, Button, Form } from 'semantic-ui-react';
import { createBrowserHistory } from 'history';

export default function PaidContent() {
  const history = createBrowserHistory({ forceRefresh: true });
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
          localStorage.setItem('loginRedirectPath', '/');
          history.push('/');
        }}
      >
        Log in
      </Form.Field>
    </div>
  );
}

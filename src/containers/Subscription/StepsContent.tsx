import React from 'react';
import { Icon, Divider } from 'semantic-ui-react';
import './globals.scss';

interface StepsContentProps {
  contentType: string;
  loggedIn?: boolean;
}

function StepsContent(props: StepsContentProps) {
  const { contentType, loggedIn } = props;
  return (
    <div className="login-container__steps-content">
      <div
        className={`login-container__steps-content__${!loggedIn ? 'register' : 'login'} ${
          contentType !== 'payment' ? 'active' : 'false'
        }`}
      >
        <span className="login-container__steps-content__register__title">
          1.
          {(contentType !== 'payment' && contentType === 'login') || loggedIn
            ? ' Login'
            : ' Register'}
        </span>
        <span className="login-container__steps-content__register__icon">
          <Icon name="pen square" />
        </span>
      </div>

      <Divider section />
      <div
        className={`login-container__steps-content__payment ${contentType === 'payment' &&
          'active'}`}
      >
        <span className="login-container__steps-content__payment__title">2. Payment</span>
        <span className="login-container__steps-content__payment__icon">
          <Icon name="credit card" />
        </span>
      </div>
    </div>
  );
}

export default StepsContent;

import React from 'react';
import { createBrowserHistory } from 'history';

/* Styling */
import styles from './index.module.scss';

const PaidContent = () => {
  const history = createBrowserHistory({ forceRefresh: true });
  return (
    <section className={styles.paidContainer}>
      <h2>Your account already has an active plan</h2>
      <p>
        Contact us if you have any questions:{' '}
        <a href="mailto:support@sellgo.com">support@sellgo.com</a>
      </p>
      <button
        onClick={() => {
          localStorage.setItem('loginRedirectPath', '/');
          history.push('/subscription');
        }}
      >
        Open Sellgo Pricing
      </button>
    </section>
  );
};

export default PaidContent;

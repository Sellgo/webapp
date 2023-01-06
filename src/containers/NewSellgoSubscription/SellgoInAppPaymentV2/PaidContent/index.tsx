import React from 'react';
import { createBrowserHistory } from 'history';

/* Styling */
import styles from './index.module.scss';

const PaidContent = () => {
  const history = createBrowserHistory({ forceRefresh: true });
  return (
    <section className={styles.paidContainer}>
      <h2>Activate your account instantly</h2>
      <p>
        Contact us if you have any questions:{' '}
        <a href="mailto:support@sellgo.com">support@sellgo.com</a>
      </p>
      <button
        onClick={() => {
          localStorage.setItem('loginRedirectPath', '/');
          history.push('/settings/pricing');
        }}
      >
        Go to payment
      </button>
    </section>
  );
};

export default PaidContent;

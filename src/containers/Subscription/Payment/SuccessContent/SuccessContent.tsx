import React from 'react';

import { createBrowserHistory } from 'history';

/* Styling */
import styles from './index.module.scss';

const SuccessContent = (props: any) => {
  const { sellerSubscription } = props;
  const history = createBrowserHistory({ forceRefresh: true });

  return (
    <section className={styles.successContainer}>
      <h2>Payment Success</h2>

      {!sellerSubscription && <p>Please verify you email</p>}

      <p>A receipt has been sent to your email.</p>
      <button
        onClick={() => {
          localStorage.setItem('loginRedirectPath', '/');
          history.push('/');
        }}
      >
        Log in
      </button>
    </section>
  );
};

export default SuccessContent;

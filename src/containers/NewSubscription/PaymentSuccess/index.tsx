import React from 'react';

import { createBrowserHistory } from 'history';

/* Styling */
import styles from './index.module.scss';

/* Assets */
import newSellgoLogo from '../../../assets/images/sellgoNewLogo.png';

const PaymentSuccess = () => {
  const history = createBrowserHistory({ forceRefresh: true });

  return (
    <main className={styles.successPage}>
      <div className={styles.logo}>
        <img src={newSellgoLogo} alt="Sellgo Company Logo" />
      </div>
      <section className={styles.successContainer}>
        <h2>Payment Success</h2>

        <p>Please activate your email to register.</p>

        <p>We have sent you an activation link in your email.</p>
        <button
          onClick={() => {
            localStorage.setItem('loginRedirectPath', '/');
            history.push('/');
          }}
        >
          Log in
        </button>
      </section>
    </main>
  );
};

export default PaymentSuccess;

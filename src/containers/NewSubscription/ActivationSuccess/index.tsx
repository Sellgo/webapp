import React from 'react';

import { createBrowserHistory } from 'history';

/* Styling */
import styles from './index.module.scss';

/* Assets */
import newSellgoLogo from '../../../assets/images/sellgoNewLogo.png';

const ActivationSuccess = () => {
  const history = createBrowserHistory({ forceRefresh: true });

  return (
    <main className={styles.successPage}>
      <div className={styles.logo}>
        <img src={newSellgoLogo} alt="Sellgo Company Logo" />
      </div>
      <section className={styles.successContainer}>
        <h2>Congratulations!</h2>
        <br />
        <p>
          Your Account is activated.
          <br />
          <br />
          We are excited to be Amazon seller's best friend! Our product is incredibly easy to use
          with a simple interface
        </p>

        <button
          onClick={() => {
            localStorage.setItem('loginRedirectPath', '/');
            history.push('/');
          }}
        >
          Go to login page
        </button>
      </section>
    </main>
  );
};

export default ActivationSuccess;

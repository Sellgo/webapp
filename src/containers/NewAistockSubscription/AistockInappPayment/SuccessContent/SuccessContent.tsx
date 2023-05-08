import React from 'react';

import { createBrowserHistory } from 'history';

/* Styling */
import styles from './index.module.scss';

/* Utils */
import { trackDripDropOff } from '../../../../utils/analyticsTracking';

const SuccessContent = () => {
  const history = createBrowserHistory({ forceRefresh: true });

  React.useEffect(() => {
    trackDripDropOff('Aistock Paid');
  }, []);

  return (
    <section className={styles.successContainer}>
      <h2>Payment successful! Thank you.</h2>

      <p>A receipt has been sent to your email.</p>
      <button
        onClick={() => {
          localStorage.setItem('loginRedirectPath', '/');
          history.push('/');
        }}
      >
        Continue to your plan
      </button>
    </section>
  );
};

export default SuccessContent;

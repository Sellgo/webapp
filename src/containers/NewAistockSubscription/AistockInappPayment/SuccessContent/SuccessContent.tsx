import React from 'react';

import { createBrowserHistory } from 'history';

/* Styling */
import styles from './index.module.scss';

/* Utils */
import { trackDripDropOff } from '../../../../utils/analyticsTracking';

const SuccessContent = () => {
  const history = createBrowserHistory({ forceRefresh: true });

  React.useEffect(() => {
    trackDripDropOff('aistock_paid');
  }, []);

  return (
    <section className={styles.successContainer}>
      <h2>Payment Success</h2>

      <p>We have sent you a receipt in your email</p>
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

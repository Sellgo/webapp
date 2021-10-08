import React from 'react';
// import Axios from 'axios';

/* Styling */
import styles from './index.module.scss';

/* Assets */
import newSellgoLogo from '../../../assets/images/sellgoNewLogo.png';

/* Config */
// import { AppConfig } from '../../../config';

const Activation = () => {
  return (
    <main className={styles.paymentPage}>
      <div className={styles.logo}>
        <img src={newSellgoLogo} alt="Sellgo Company Logo" />
      </div>

      <section>
        <h1> Activate! </h1>
      </section>
    </main>
  );
};

export default Activation;

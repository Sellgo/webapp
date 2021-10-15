import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import AccountConnectionSection from './AccountConnectionSection';
import ExtensionSection from './ExtensionSection';
import FeaturesSection from './FeaturesSection';
import ActionButton from '../../components/ActionButton';

/* Assets */
import SellgoLogo from '../../assets/images/SellgoNewestLogo.png';

const PilotLogin = () => {
  return (
    <>
      <main className={styles.pilotLoginPageWrapper}>
        <div className={styles.topBar}>
          <img src={SellgoLogo} alt="sellgo-logo" className={styles.sellgoLogo} />
          <ActionButton type="purpleGradient" variant="primary" size="md">
            Finish Setup
          </ActionButton>
        </div>
        <AccountConnectionSection />
        <ExtensionSection />
        <FeaturesSection />
      </main>
    </>
  );
};

export default PilotLogin;

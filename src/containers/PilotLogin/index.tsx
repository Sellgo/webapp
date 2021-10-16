import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import AccountConnectionSection from './AccountConnectionSection';
import ExtensionSection from './ExtensionSection';
import FeaturesSection from './FeaturesSection';
import PilotLoginHeader from '../../components/PilotLoginHeader';

const PilotLogin = () => {
  return (
    <>
      <main className={styles.pilotLoginPageWrapper}>
        <PilotLoginHeader />
        <AccountConnectionSection />
        <ExtensionSection />
        <FeaturesSection />
      </main>
    </>
  );
};

export default PilotLogin;

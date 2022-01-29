import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import AccountConnectionSection from './AccountConnectionSection';
import ExtensionSection from './ExtensionSection';
import FeaturesSection from './FeaturesSection';

const PreMigration = () => {
  return (
    <>
      <main className={styles.pilotLoginPageWrapper}>
        <AccountConnectionSection />
        <ExtensionSection />
        <FeaturesSection />
      </main>
    </>
  );
};

export default PreMigration;

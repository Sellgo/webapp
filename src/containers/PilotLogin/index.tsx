import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import AccountConnectionSection from './AccountConnectionSection';
import ExtensionSection from './ExtensionSection';
import FeaturesSection from './FeaturesSection';
import PilotLoginHeader from '../../components/PilotLoginHeader';
import QuickWinModal from './QuickWinModal';

const PilotLogin = () => {
  const [showQuickWinModal, setShowQuickWinModal] = React.useState<boolean>(false);

  React.useEffect(() => {
    /* Only show quick win modal popup on the first time user enters into account setup page */
    const quickWinModalStatus = localStorage.getItem('showQuickWinModal');
    if (quickWinModalStatus && quickWinModalStatus === 'false') {
      setShowQuickWinModal(false);
    } else {
      setShowQuickWinModal(true);
      localStorage.setItem('showQuickWinModal', 'false');
    }
  }, []);

  return (
    <>
      {showQuickWinModal && <QuickWinModal />}
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

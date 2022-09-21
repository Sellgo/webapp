import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

/* Styling */
import styles from './index.module.scss';

/* components */
import SpApiForm from '../../Settings/SPConnectivity/SpApiForm';
import ActionButton from '../../../components/ActionButton';
import PilotOnboarding from '../PilotOnboarding';

/* Assets */
import TenFactorLogo from '../../../assets/images/TenFactorLogo.png';
import MetkixLogo from '../../../assets/images/MetkixLogo.png';
import LuxeLogo from '../../../assets/images/LuxeLogo.png';
import SkopeLogo from '../../../assets/images/SkopeLogo.png';
import BBLogo from '../../../assets/images/BBLogo.png';
import BFLogo from '../../../assets/images/BFLogo.png';
import aistockLogo from '../../../assets/images/aistockLogo.png';

/* Utils */
import { AppConfig } from '../../../config';
import { sellerIDSelector } from '../../../selectors/Seller';
import { error, success } from '../../../utils/notifications';

/* Actions */
import { fetchSellerSubscription } from '../../../actions/Settings/Subscription';

interface Props {
  fetchSellerSubscription: () => void;
}

const PreMigration = (props: Props) => {
  const { fetchSellerSubscription } = props;
  const [showPreMigration, setShowPreMigration] = React.useState(false);
  const [isSpApiAuthenticated, setIsSpApiAuthenticated] = React.useState(false);

  const runMigration = async () => {
    try {
      const url = `${
        AppConfig.BASE_URL_API
      }sellers/${sellerIDSelector()}/perfect-stock/run-init-migration`;
      /* Set IS_MOCK to true to run migration in mock mode if in dev */
      const payload = {
        is_mock: false,
      };
      const { status } = await axios.post(url, payload);

      if (status === 200) {
        success('Migration started successfully');
        fetchSellerSubscription();
      }
    } catch (err) {
      error('Error starting migration');
    }
  };

  if (!showPreMigration) {
    return <PilotOnboarding redirectToMigrate={() => setShowPreMigration(true)} />;
  }

  return (
    <>
      <main className={styles.pilotLoginPageWrapper}>
        <h1>AiStock migration is ready to start</h1>
        <p>
          When the migration is done, your supply chain will be fully automated through a lightning
          speed and robust algorithm,
          <br />
          so now you can ensure your fast-selling inventories are always in-stock and your business
          is liquid.
        </p>

        <div className={styles.row}>
          <div className={styles.spApiFormWrapper}>
            <SpApiForm setIsSpApiAuthenticated={setIsSpApiAuthenticated} />
            <ActionButton
              variant="primary"
              type="purpleGradient"
              size="md"
              onClick={runMigration}
              className={styles.migrationButton}
              disabled={!isSpApiAuthenticated}
            >
              Start migration now
            </ActionButton>
          </div>
          <section className={styles.socialProofSection}>
            <img src={aistockLogo} alt="aistock-logo" className={styles.aistockLogo} />
            <p className={styles.socialProofDesc}>Trusted by top Amazon brands</p>
            <div className={styles.socialProofIcons}>
              <img className={styles.logo} src={BBLogo} alt="bblogo" />
              <img className={styles.logo} src={TenFactorLogo} alt="TenFactorLogo" />
              <img className={styles.logo} src={MetkixLogo} alt="MetkixLogo" />
              <img className={styles.logo} src={LuxeLogo} alt="LuxeLogo" />
              <img className={styles.logo} src={SkopeLogo} alt="SkopeLogo" />
              <img className={styles.logo} src={BFLogo} alt="BFLogo" />
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSellerSubscription: () => dispatch(fetchSellerSubscription()),
  };
};

export default connect(null, mapDispatchToProps)(PreMigration);
